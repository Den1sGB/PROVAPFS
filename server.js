const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectMongo, connectPostgres, sequelize } = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const roomRoutes = require('./src/routes/roomRoutes');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user'); // Certifique-se de importar o modelo User

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// Middleware para autenticar e adicionar o nome do usuário ao socket
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return next(new Error('Autenticação falhou'));
      socket.userId = decoded.id;
      const user = await User.findByPk(decoded.id);
      socket.userName = user.name;
      next();
    });
  } else {
    next(new Error('Token não fornecido'));
  }
});

// WebSocket
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    io.to(roomId).emit('user-joined', socket.userName);
  });

  socket.on('signal', (data) => {
    io.to(data.roomId).emit('signal', data);
  });

  socket.on('chat-message', (data) => {
    io.to(data.roomId).emit('chat-message', { message: data.message, userName: socket.userName });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Conexões com os bancos de dados
connectMongo().catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
  process.exit(1);
});

connectPostgres().then(() => {
  sequelize.sync({ force: false })
    .then(() => {
      console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch(err => {
      console.error('Erro ao sincronizar o banco de dados:', err);
      process.exit(1);
    });
});

// Rota para servir o arquivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/room', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});

app.get('/rooms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rooms.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Inicializando o servidor na porta definida
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
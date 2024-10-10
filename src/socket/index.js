const socketio = require('socket.io');

const initializeSocket = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('Novo usuário conectado:', socket.id);

    // Evento para o usuário entrar na sala
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`Usuário ${socket.id} entrou na sala ${roomId}`);
      socket.to(roomId).emit('user-connected', socket.id);
    });

    // Evento de sinalização de áudio/vídeo
    socket.on('signal', (data) => {
      const { roomId, signalData } = data;
      io.to(roomId).emit('signal', { socketId: socket.id, signalData });
    });

    // Evento quando o usuário desconecta
    socket.on('disconnect', () => {
      console.log('Usuário desconectado:', socket.id);
    });
  });
};

module.exports = { initializeSocket };

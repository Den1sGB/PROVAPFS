const Room = require('../models/room');

// Criação de sala
exports.createRoom = async (req, res) => {
  const { name, description, capacity } = req.body;
  console.log('Recebendo requisição para criar sala:', { name, description, capacity }); // Log para depuração
  try {
    const room = new Room({ name, description, capacity });
    await room.save();
    console.log('Sala criada com sucesso:', room); // Log para depuração
    res.status(201).json(room); // Retorna a sala criada
  } catch (err) {
    console.error('Erro ao criar sala:', err); // Log para depuração
    res.status(400).json({ error: 'Failed to create room' });
  }
};

// Listagem de salas
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}, '_id name description capacity participants createdAt'); // Inclui explicitamente o campo _id
    console.log('Salas encontradas:', rooms); // Log para depuração
    res.json(rooms);  // Retorna a lista de salas em formato JSON
  } catch (err) {
    console.error('Erro ao buscar salas:', err); // Log para depuração
    res.status(500).json({ error: 'Failed to fetch rooms' });  // Retorna erro caso algo dê errado
  }
};

// Participar de sala
exports.joinRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    // Lógica de participação na sala aqui...
    res.json({ message: `User joined room ${roomId}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join room' });
  }
};
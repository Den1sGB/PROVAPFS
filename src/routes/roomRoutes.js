const express = require('express');
const router = express.Router();
const { createRoom, getRooms, joinRoom } = require('../controllers/roomController');
const authenticateToken = require('../middlewares/authMiddleware'); // Middleware de autenticação

// Rota para criar uma nova sala
router.post('/', authenticateToken, createRoom);

// Rota para listar todas as salas
router.get('/', authenticateToken, getRooms);

// Rota para participar em uma sala
router.post('/:roomId/join', authenticateToken, joinRoom);

module.exports = router;
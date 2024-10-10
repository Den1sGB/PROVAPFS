// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
// Supondo que você tenha controladores para as rotas
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router; // Aqui deve estar a exportação do router

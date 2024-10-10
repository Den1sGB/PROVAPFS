const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Verifica o cabeçalho Authorization
  const authHeader = req.headers['authorization'];
  
  // O token pode vir como 'Bearer <token>', então removemos o 'Bearer ' para obter apenas o token
  const token = authHeader && authHeader.split(' ')[1];

  // Se o token não estiver presente, retorna 403 (proibido)
  if (!token) return res.status(403).json({ message: 'Token de acesso ausente ou inválido.' });

  // Verifica o token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });

    // Se o token for válido, salva as informações do usuário no request
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
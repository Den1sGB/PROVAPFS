const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importando a instância do Sequelize

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User; // Exportando o modelo User

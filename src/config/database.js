const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do Sequelize para PostgreSQL
const sequelize = new Sequelize(process.env.RELATIONAL_DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Isso pode ser necessário para evitar erros de SSL
    },
  },
});

// Função para conectar ao PostgreSQL
const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected via Sequelize');
  } catch (err) {
    console.error('Unable to connect to the PostgreSQL database:', err);
  }
};

// Conexão com MongoDB
const mongoose = require('mongoose');
require('dotenv').config();
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      // A opção 'useNewUrlParser' e 'useUnifiedTopology' não são mais necessárias a partir do Driver 4.0.0
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

// Exportando as conexões
module.exports = {
  sequelize,    // Exportando a instância do Sequelize
  connectPostgres, // Exportando a fun  ção de conexão com PostgreSQL
  connectMongo, // Exportando a função de conexão com MongoDB
};

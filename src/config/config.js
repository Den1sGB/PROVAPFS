require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    url: process.env.RELATIONAL_DB_URL,
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Para evitar erros de SSL
      },
    },
  },
  test: {
    dialect: 'postgres',
    url: process.env.RELATIONAL_DB_URL,
  },
  production: {
    dialect: 'postgres',
    url: process.env.RELATIONAL_DB_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Para evitar erros de SSL
      },
    },
  },
};

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quanlysinhvien', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

try {
  sequelize.authenticate();
  console.log('Connection SQL has been successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize

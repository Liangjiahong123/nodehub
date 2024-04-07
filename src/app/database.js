const { Sequelize } = require('sequelize');
const { sqlLogger } = require('../../logs');

// 连接数据库
const sequelize = new Sequelize('nodehub', 'root', 'Jh123.com', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => void sqlLogger.debug(msg) // 不输出日志
});

module.exports = sequelize;

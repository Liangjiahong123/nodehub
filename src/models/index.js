const User = require('./user');
const sequelize = require('../app/database');

sequelize.sync();
module.exports = { User };

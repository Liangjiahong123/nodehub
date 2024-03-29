const User = require('./user');
const Moment = require('./moment');
const sequelize = require('../app/database');

User.hasMany(Moment);
Moment.belongsTo(User, { foreignKey: 'userId' });
sequelize.sync();

module.exports = { User, Moment };

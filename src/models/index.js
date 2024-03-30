const User = require('./user');
const Moment = require('./moment');
const Comment = require('./comment');
const sequelize = require('../app/database');

User.hasMany(Moment);
User.hasMany(Comment);
Moment.hasMany(Comment);
Moment.belongsTo(User, { foreignKey: 'userId' });
Comment.hasMany(Comment);
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Moment, { foreignKey: 'momentId' });
Comment.belongsTo(Comment, { foreignKey: 'commentId' });

sequelize.sync();

module.exports = { User, Moment, Comment };

const User = require('./user');
const Moment = require('./moment');
const Comment = require('./comment');
const Label = require('./label');
const LabelMoment = require('./labelMoment');
const sequelize = require('../app/database');

User.hasMany(Moment);
User.hasMany(Comment);
Moment.hasMany(Comment);
Moment.belongsTo(User, { foreignKey: 'userId' });
Comment.hasMany(Comment);
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Moment, { foreignKey: 'momentId' });
Comment.belongsTo(Comment, { foreignKey: 'commentId' });
Moment.belongsToMany(Label, { through: LabelMoment });
Label.belongsToMany(Moment, { through: LabelMoment });

sequelize.sync();

module.exports = { User, Moment, Comment, Label, LabelMoment };

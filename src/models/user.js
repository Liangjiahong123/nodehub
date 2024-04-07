const { DataTypes, Model } = require('sequelize');
const sequelize = require('../app/database');

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    avatarUrl: {
      type: DataTypes.STRING(255)
    }
  },
  { paranoid: true, modelName: 'user', sequelize }
);

module.exports = User;

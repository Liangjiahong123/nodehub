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
    }
  },
  { paranoid: true, modelName: 'User', sequelize }
);

module.exports = User;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../app/database');

class Moment extends Model {}
Moment.init(
  {
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    paranoid: true,
    modelName: 'Moment',
    sequelize
  }
);

module.exports = Moment;

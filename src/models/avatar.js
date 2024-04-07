const { DataTypes, Model } = require('sequelize');
const sequelize = require('../app/database');

class Avatar extends Model {}
Avatar.init(
  {
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    mimetype: {
      type: DataTypes.STRING(30),
      defaultValue: null
    },
    size: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
  { modelName: 'avatar', sequelize }
);
module.exports = Avatar;

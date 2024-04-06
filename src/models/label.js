const { DataTypes, Model } = require('sequelize');
const sequelize = require('../app/database');

class Label extends Model {}
Label.init(
  {
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    }
  },
  { modelName: 'label', sequelize }
);

module.exports = Label;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../app/database');

class LabelMoment extends Model {}
LabelMoment.init(
  {
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'labels',
        key: 'id'
      }
    },
    momentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'moments',
        key: 'id'
      }
    }
  },
  { primaryKey: false, modelName: 'labelMoment', sequelize }
);

module.exports = LabelMoment;

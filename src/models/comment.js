const { DataTypes, Model } = require('sequelize');
const sequelize = require('../app/database');

class Comment extends Model {}
Comment.init(
  {
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    momentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'moments',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    commentId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: 'comments',
        key: 'id'
      }
    }
  },
  { paranoid: true, modelName: 'comment', sequelize }
);

module.exports = Comment;

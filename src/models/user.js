const { DataTypes, Model } = require('@sequelize/core');
const sequelize = require('./db');

class User extends Model {}

User.init({});

module.exports = User;

const { User } = require('../models');
const { omit } = require('../utils/property');

class userService {
  async create(user) {
    const ins = await User.create(user);
    const result = omit(ins.toJSON(), ['password']);
    return result;
  }

  async findByName(name) {
    let [result] = await User.findAll({
      where: { name }
    });
    if (result) {
      result = omit(result.toJSON(), ['password']);
      return result;
    }
    return null;
  }
}

module.exports = new userService();

const { User } = require('../models');

class userService {
  async create(user) {
    const ins = await User.create(user);
    return ins.toJSON();
  }

  async findByName(name) {
    const [result] = await User.findAll({
      where: { name }
    });
    if (result) return result.toJSON();
    return null;
  }

  async update(id, user) {
    await User.update(user, {
      where: { id }
    });
  }
}

module.exports = new userService();

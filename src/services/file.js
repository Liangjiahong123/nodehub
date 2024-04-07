const { Avatar } = require('../models');

class FileService {
  async create(userId, file) {
    const ins = await Avatar.create({ ...file, userId });
    return ins.toJSON();
  }

  async findById(userId) {
    const result = await Avatar.findAll({
      where: { userId }
    });
    if (!!result.length) return result.pop().toJSON();
    return null;
  }
}

module.exports = new FileService();

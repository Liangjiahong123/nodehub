const Avatar = require('../models');

class FileService {
  async create(file, userId) {
    const ins = await Avatar.create({ ...file, userId });
    return ins.toJSON();
  }
}

module.exports = new FileService();

const { Moment } = require('../models');

class MomentService {
  async create(userId, content) {
    const ins = await Moment.create({ userId, content });
    return ins.toJSON();
  }
}

module.exports = new MomentService();

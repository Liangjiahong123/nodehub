const { Moment, User } = require('../models');

class MomentService {
  async create(userId, content) {
    const ins = await Moment.create({ userId, content });
    return ins.toJSON();
  }

  async findAll(query) {
    const { page, limit } = query;
    const { count, rows } = await Moment.findAndCountAll({
      attributes: { exclude: ['UserId', 'userId'] },
      include: {
        model: User,
        attributes: { exclude: ['password'] }
      },
      offset: (page - 1) * limit,
      limit: +limit
    });
    return { total: count, list: JSON.parse(JSON.stringify(rows)) };
  }

  async findById(id) {
    const [result] = await Moment.findAll({
      attributes: { exclude: ['userId'] },
      where: { id },
      include: {
        model: User,
        attributes: { exclude: ['password'] }
      }
    });
    return result.toJSON();
  }

  async update(id, content) {
    await Moment.update(content, {
      where: { id }
    });
    return null;
  }

  async remove(id) {
    await Moment.destroy({
      where: { id }
    });
    return null;
  }
}

module.exports = new MomentService();

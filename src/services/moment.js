const { literal } = require('sequelize');
const { Moment, User, Comment } = require('../models');

class MomentService {
  async create(userId, content) {
    const ins = await Moment.create({ userId, content });
    return ins.toJSON();
  }

  async findAll(query) {
    const { page, limit } = query;
    let { count, rows } = await Moment.findAndCountAll({
      attributes: {
        include: [
          literal(
            '(SELECT COUNT(*) FROM comments WHERE comments.momentId = moment.id) AS commentCount'
          )
        ]
      },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ],
      offset: (page - 1) * limit,
      limit: +limit,
      raw: true
    });
    rows = rows.map((row) => ({
      id: row.id,
      content: row.content,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
      commentCount: row.commentCount,
      user: {
        id: row['user.id'],
        name: row['user.name']
      }
    }));
    return { momentCount: count, list: JSON.parse(JSON.stringify(rows)) };
  }

  async findById(id) {
    const [result] = await Moment.findAll({
      attributes: { exclude: ['userId'] },
      where: { id },
      include: [
        {
          model: User,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
          model: Comment,
          attributes: { exclude: ['updatedAt', 'deletedAt'] }
        }
      ]
    });
    if (result) return result.toJSON();
    return null;
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

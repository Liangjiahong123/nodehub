const { literal } = require('sequelize');
const { Moment, User, Comment, LabelMoment } = require('../models');
const { mapRows } = require('../utils/property');

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
          ),
          literal(
            '(SELECT COUNT(*) FROM labelMoments WHERE labelMoments.momentId = moment.id) AS labelCount'
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
    rows = mapRows(rows, [
      'id',
      'content',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'commentCount',
      'labelCount',
      'user.id',
      'user.name'
    ]);

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
          attributes: { exclude: ['updatedAt', 'deletedAt', 'userId', 'momentId'] },
          include: [
            {
              model: User,
              attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] }
            }
          ]
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

  async hasLabel(momentId, labelId) {
    const result = await LabelMoment.findAll({
      where: {
        momentId,
        labelId
      }
    });
    return !!result.length;
  }

  async addLabel(momentId, labelId) {
    const ins = await LabelMoment.create({ momentId, labelId });
    return ins.toJSON();
  }
}

module.exports = new MomentService();

const { literal } = require('sequelize');
const { Moment, User, Comment, LabelMoment, Label } = require('../models');

class MomentService {
  async create(userId, content) {
    const ins = await Moment.create({ userId, content });
    return ins.toJSON();
  }

  async findAll(query) {
    const { page, limit } = query;
    // 查询数据
    let { count, rows } = await Moment.findAndCountAll({
      attributes: {
        include: [
          literal(
            '(SELECT COUNT(*) FROM comments WHERE comments.momentId = moment.id) AS commentCount'
          ),
          literal(
            '(SELECT COUNT(*) FROM labelMoments WHERE labelMoments.momentId = moment.id) AS labelCount'
          )
        ],
        exclude: ['userId', 'deletedAt']
      },
      include: [
        {
          model: User,
          attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] }
        },
        {
          model: Label,
          through: { attributes: [] },
          attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
      ],
      offset: (page - 1) * limit,
      limit: +limit,
      raw: true
    });

    // 处理数据
    rows = rows.reduce((acc, row) => {
      const existsMoment = acc.find((item) => item.id === row.id);
      if (existsMoment) {
        existsMoment.labels.push({ id: row['labels.id'], name: row['labels.name'] });
      } else {
        const newMoment = {
          id: row.id,
          content: row.content,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          commentCount: row.commentCount,
          labelCount: row.labelCount,
          user: {
            id: row['user.id'],
            name: row['user.name'],
            avatarUrl: row['user.avatarUrl']
          },
          labels: row['labels.id'] ? [{ id: row['labels.id'], name: row['labels.name'] }] : []
        };
        acc.push(newMoment);
      }
      return acc;
    }, []);

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

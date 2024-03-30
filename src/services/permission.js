const { Moment } = require('../models');

class PermissionService {
  async checkMoment(momentId, userId) {
    const [result] = await Moment.findAll({
      where: { userId, id: momentId }
    });
    if (result) return result.toJSON();
    return null;
  }
}

module.exports = new PermissionService();

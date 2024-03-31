const { Moment, Comment } = require('../models');

class PermissionService {
  async checkMoment(momentId, userId) {
    const [result] = await Moment.findAll({
      where: { userId, id: momentId }
    });
    if (result) return result.toJSON();
    return null;
  }

  async checkComment(commentId, userId) {
    const [result] = await Comment.findAll({
      where: { userId, id: commentId }
    });
    if (result) return result.toJSON();
    return null;
  }
}

module.exports = new PermissionService();

const { Moment, Comment } = require('../models');

const resourceModelMap = {
  momentId: Moment,
  commentId: Comment
};

class PermissionService {
  async checkResource(key, id, userId) {
    const resourceModel = resourceModelMap[key];
    const [result] = await resourceModel.findAll({
      where: { id }
    });

    if (!result) return 404;
    if (result.userId !== userId) return 401;
    return result.toJSON();
  }
}

module.exports = new PermissionService();

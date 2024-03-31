const { Comment } = require('../models');

class CommentService {
  async create(payload) {
    const ins = await Comment.create(payload);
    return ins.toJSON();
  }

  async remove(id) {
    await Comment.destroy({
      where: { id }
    });
    return null;
  }
}

module.exports = new CommentService();

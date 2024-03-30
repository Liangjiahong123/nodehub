const { Comment } = require('../models');

class CommentService {
  async create(payload) {
    const ins = await Comment.create(payload);
    return ins.toJSON();
  }
}

module.exports = new CommentService();

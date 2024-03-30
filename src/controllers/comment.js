const commentService = require('../services/comment');
const { resSuccess } = require('../utils/resFormat');

class CommentController {
  async create(ctx, next) {
    const { content, momentId, commentId = null } = ctx.request.body;
    const { id: userId } = ctx.user;
    const result = await commentService.create({ content, userId, momentId, commentId });
    ctx.body = resSuccess(result);
  }
}

module.exports = new CommentController();

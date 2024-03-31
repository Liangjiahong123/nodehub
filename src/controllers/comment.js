const commentService = require('../services/comment');
const { resSuccess } = require('../utils/resFormat');

class CommentController {
  async create(ctx, next) {
    const { content, momentId, commentId = null } = ctx.request.body;
    const { id: userId } = ctx.user;
    const result = await commentService.create({ content, userId, momentId, commentId });
    ctx.body = resSuccess(result);
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    await commentService.remove(commentId);
    ctx.body = resSuccess(null);
  }
}

module.exports = new CommentController();

const commentService = require('../services/comment');
const { resSuccess } = require('../utils/resFormat');

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id: userId } = ctx.user;
    const result = await commentService.create({ content, userId, momentId });
    ctx.body = resSuccess(result);
  }
  async findAll(ctx, next) {}
}

module.exports = new CommentController();

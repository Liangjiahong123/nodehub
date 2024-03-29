const momentService = require('../services/moment');
const { resSuccess } = require('../utils/resFormat');
class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    const moment = await momentService.create(id, content);
    ctx.body = resSuccess(moment);
  }
}

module.exports = new MomentController();

const momentService = require('../services/moment');
const { resSuccess } = require('../utils/resFormat');

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    const moment = await momentService.create(id, content);
    ctx.body = resSuccess(moment);
  }

  async findAll(ctx, next) {
    const { page = 1, limit = 10 } = ctx.query;
    const allMoments = await momentService.findAll({ page, limit });
    ctx.body = resSuccess(allMoments);
  }
}

module.exports = new MomentController();

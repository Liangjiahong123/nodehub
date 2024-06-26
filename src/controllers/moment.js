const momentService = require('../services/moment');
const { resSuccess } = require('../utils/resFormat');
const { pick } = require('../utils/property');

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

  async findById(ctx, next) {
    const momentId = ctx.params.momentId;
    const moment = await momentService.findById(momentId);
    ctx.body = resSuccess(moment);
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const newContent = pick(ctx.request.body, ['content']);
    await momentService.update(momentId, newContent);
    ctx.body = resSuccess(null);
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    await momentService.remove(momentId);
    ctx.body = resSuccess(null);
  }

  async addLabel(ctx, next) {
    const { momentId } = ctx.params;
    const labels = ctx.labels;

    // 将momentId和labelId添加到labelMoment关系表
    for (const label of labels) {
      const existsFlag = await momentService.hasLabel(momentId, label.id);
      if (existsFlag) continue;
      await momentService.addLabel(momentId, label.id);
    }

    ctx.body = resSuccess(null);
  }
}

module.exports = new MomentController();

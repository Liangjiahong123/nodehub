const labelService = require('../services/label');
const { resSuccess } = require('../utils/resFormat');

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelService.create(name);
    ctx.body = resSuccess(result);
  }
}

module.exports = new LabelController();

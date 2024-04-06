const { LABEL_NAME_IS_REQUIRED, LABEL_NAME_IS_EXISTS } = require('../config/errType');
const labelService = require('../services/label');

async function labelVerify(ctx, next) {
  const { name } = ctx.request.body;

  if (!name) {
    ctx.app.emit('error', LABEL_NAME_IS_REQUIRED, ctx);
    return;
  }

  const label = await labelService.findByName(name);
  if (label) {
    ctx.app.emit('error', LABEL_NAME_IS_EXISTS, ctx);
    return;
  }

  await next();
}

module.exports = { labelVerify };

const { LABELS_IS_REQUIRED, LABELS_IS_EXISTS } = require('../config/errType');
const labelService = require('../services/label');
const { isEmpty } = require('../utils/valid');

async function labelVerifyExists(ctx, next) {
  const { labels } = ctx.request.body;

  // 确保labels不为空
  if (isEmpty(labels)) {
    ctx.app.emit('error', LABELS_IS_REQUIRED, ctx);
    return;
  }

  // 判断labels中的name是否存在
  const newLabels = [];
  for (const name of labels) {
    const result = await labelService.findByName(name);
    const newLabel = { name };

    if (result) {
      newLabel.id = result.id;
    } else {
      const createLabel = await labelService.create(name);
      newLabel.id = createLabel.id;
    }
    newLabels.push(newLabel);
  }

  // 将处理的label传递到下一个中间件
  ctx.labels = newLabels;
  await next();
}

async function createLabelVerify(ctx, next) {
  const { name } = ctx.request.body;
  if (!name) {
    ctx.app.emit('error', LABELS_IS_REQUIRED, ctx);
    return;
  }
  const result = await labelService.findByName(name);
  if (result) {
    ctx.app.emit('error', LABELS_IS_EXISTS, ctx);
    return;
  }
  await next();
}

module.exports = { labelVerifyExists, createLabelVerify };

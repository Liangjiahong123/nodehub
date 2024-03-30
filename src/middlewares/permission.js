const permissionService = require('../services/permission');
const { isNull } = require('../utils/valid');
const { NOT_PERMISSION } = require('../config/errType');

async function verifyMomentPermission(ctx, next) {
  const { momentId } = ctx.params;
  const { id: userId } = ctx.user;

  const result = await permissionService.checkMoment(momentId, userId);
  if (isNull(result)) {
    ctx.app.emit('error', NOT_PERMISSION, ctx);
    return;
  }

  await next();
}

module.exports = { verifyMomentPermission };

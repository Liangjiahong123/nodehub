const permissionService = require('../services/permission');
const { isObject } = require('../utils/valid');
const { NOT_PERMISSION, NOT_FOUND } = require('../config/errType');

async function verifyResourcePermission(ctx, next) {
  const resourceKey = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[resourceKey];
  const result = await permissionService.checkResource(resourceKey, resourceId, ctx.user.id);
  if (isObject(result)) {
    await next();
  } else {
    const errType = result === 404 ? NOT_FOUND : NOT_PERMISSION;
    ctx.app.emit('error', errType, ctx);
  }
}

module.exports = { verifyResourcePermission };

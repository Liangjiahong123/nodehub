const userService = require('../services/user');
const { NAME_IS_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED } = require('../config/errType');

const userVerify = async function (ctx, next) {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
    return;
  }

  const result = await userService.findByName(name);

  if (result) {
    ctx.app.emit('error', NAME_IS_EXISTS, ctx);
    return;
  }

  await next();
};

module.exports = { userVerify };

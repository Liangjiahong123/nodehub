const userService = require('../services/user');
const { NAME_IS_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED } = require('../config/errType');
const md5Crypt = require('../utils/crypt');

async function userVerify(ctx, next) {
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
}

async function userPwdCrypt(ctx, next) {
  let { password } = ctx.request.body;
  password = md5Crypt(password);
  ctx.request.body.password = password;
  await next();
}

module.exports = { userVerify, userPwdCrypt };

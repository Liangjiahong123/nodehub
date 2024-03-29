const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_WRONG
} = require('../config/errType');
const userService = require('../services/user');
const md5Crypt = require('../utils/crypt');
const { isEmpty, isNull } = require('../utils/valid');

async function loginVerify(ctx, next) {
  const { name, password } = ctx.request.body;
  if (isEmpty(name) || isEmpty(password)) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
    return;
  }

  const user = await userService.findByName(name);
  if (isNull(user)) {
    ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx);
    return;
  }
  if (user.password !== md5Crypt(password)) {
    ctx.app.emit('error', PASSWORD_IS_WRONG, ctx);
    return;
  }

  ctx.user = user;

  await next();
}

module.exports = {
  loginVerify
};

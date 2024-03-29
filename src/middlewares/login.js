const jwt = require('jsonwebtoken');
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_WRONG,
  NOT_AUTHORIZATION
} = require('../config/errType');
const userService = require('../services/user');
const md5Crypt = require('../utils/crypt');

const { isEmpty, isNull, isUndefined } = require('../utils/valid');
const { PUBLIC_KEY } = require('../config/screct');

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

async function authVerify(ctx, next) {
  const authorization = ctx.headers.authorization;
  const token = authorization?.replace('Bearer ', '') || '';
  if (isUndefined(token)) {
    ctx.app.emit('error', NOT_AUTHORIZATION, ctx);
    return;
  }

  try {
    jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    await next();
  } catch (error) {
    console.error(error);
    ctx.app.emit('error', NOT_AUTHORIZATION, ctx);
  }
}

module.exports = {
  loginVerify,
  authVerify
};

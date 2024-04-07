const fs = require('fs');
const userService = require('../services/user');
const fileService = require('../services/file');
const { NAME_IS_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED, NOT_FOUND } = require('../config/errType');
const md5Crypt = require('../utils/crypt');
const { UPLOAD_PATH } = require('../config/path');

async function userVerify(ctx, next) {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
    return;
  }

  const user = await userService.findByName(name);
  if (user) {
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

async function showUserAvatar(ctx, next) {
  const { userId } = ctx.params;
  const avatarInfo = await fileService.findById(userId);

  if (avatarInfo) {
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  } else {
    ctx.app.emit('error', NOT_FOUND, ctx);
  }
}

module.exports = { userVerify, userPwdCrypt, showUserAvatar };

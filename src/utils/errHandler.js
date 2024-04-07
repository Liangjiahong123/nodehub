const app = require('../app');
const { resError } = require('../utils/resFormat');
const {
  SERVER_ERROR,
  NAME_IS_EXISTS,
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_WRONG,
  NOT_AUTHORIZATION,
  NOT_PERMISSION,
  NOT_FOUND,
  LABELS_IS_REQUIRED
} = require('../config/errType');

app.on('error', (err, ctx) => {
  let message = 'server internal error ',
    errCode = 500;

  switch (err) {
    case NOT_FOUND:
      message = '资源不存在~';
      errCode = -404;
      break;
    case SERVER_ERROR:
      message = '服务器错误~';
      errCode = -500;
      break;
    case NAME_OR_PASSWORD_IS_REQUIRED:
      message = '用户名或密码不能为空~';
      errCode = -1001;
      break;
    case NAME_IS_EXISTS:
      message = '当前用户名已存在~';
      errCode = -1002;
      break;
    case NAME_IS_NOT_EXISTS:
      message = '当前用户名不存在~';
      errCode = -1003;
      break;
    case PASSWORD_IS_WRONG:
      message = '密码错误~';
      errCode = -1004;
      break;
    case NOT_AUTHORIZATION:
      message = '登录已过期~';
      errCode = -1005;
      break;
    case NOT_PERMISSION:
      message = '无权限~';
      errCode = -1006;
      break;
    case LABELS_IS_REQUIRED:
      message = '标签不能为空~';
      errCode = -1007;
      break;
    default:
      message = '服务器错误~';
      errCode = -500;
      break;
  }

  ctx.body = resError(message, errCode);
});

const { SERVER_ERROR } = require('../config/errType');

function resError(msg = 'server internal error', code = 500) {
  return { code, msg };
}

function resSuccess(result) {
  return { code: 0, msg: '成功', data: result };
}

function errCatch(handler) {
  return async (ctx, next) => {
    try {
      await handler(ctx, next);
    } catch (error) {
      console.error(error);
      ctx.app.emit('error', SERVER_ERROR, ctx);
    }
  };
}

module.exports = { resError, resSuccess, errCatch };

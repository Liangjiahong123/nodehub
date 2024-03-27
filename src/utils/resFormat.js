function resError(msg = 'server internal error', code = 500) {
  return { code, msg };
}

function resSuccess(result) {
  return { code: 0, msg: '成功', data: result };
}

module.exports = { resError, resSuccess };

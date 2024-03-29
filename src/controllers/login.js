const jwt = require('jsonwebtoken');
const { pick } = require('../utils/property');
const { resSuccess } = require('../utils/resFormat');
const { PRIVATE_KEY, PUBLIC_KEY } = require('../config/screct');
const { SERVER_ERROR } = require('../config/errType');

class LoginController {
  sign(ctx, next) {
    const { id, name } = pick(ctx.user, ['id', 'name']);
    try {
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: 'RS256'
      });
      ctx.body = resSuccess({ id, name, token });
    } catch (error) {
      console.error(error);
      ctx.app.emit('error', SERVER_ERROR, ctx);
    }
  }
}

module.exports = new LoginController();

const userService = require('../services/user');
const { omit } = require('../utils/property');
const { resSuccess } = require('../utils/resFormat');

class UserControl {
  async create(ctx, next) {
    await userService.create(ctx.request.body);
    ctx.body = resSuccess(null);
  }
}

module.exports = new UserControl();

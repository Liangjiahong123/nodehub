const userService = require('../services/user');

class UserControl {
  async create(ctx, next) {
    const result = await userService.create(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = new UserControl();

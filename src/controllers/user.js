const userService = require('../services/user');
const { omit } = require('../utils/property');

class UserControl {
  async create(ctx, next) {
    let result = await userService.create(ctx.request.body);
    result = omit(result, ['passowrd']);
    ctx.body = result;
  }
}

module.exports = new UserControl();

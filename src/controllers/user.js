const userService = require('../services/user');

class UserControl {
  create(ctx, next) {
    userService.create(ctx.request.body);
  }
}

module.exports = new UserControl();

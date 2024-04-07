const fileService = require('../services/file');
const userService = require('../services/user');
const { resSuccess } = require('../utils/resFormat');
const { SERVER_HOST } = require('../config/server');

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id: userId } = ctx.user;
    await fileService.create(userId, { filename, mimetype, size });
    const avatarUrl = `${SERVER_HOST}/api/users/avatar/${userId}`;
    await userService.update(userId, { avatarUrl });
    ctx.body = resSuccess({ data: avatarUrl });
  }
}

module.exports = new FileController();

const fileService = require('../services/file');
const { resSuccess } = require('../utils/resFormat');

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id: userId } = ctx.user;
    await fileService.create({ filename, mimetype, size }, userId);
    ctx.body = resSuccess(null);
  }
}

module.exports = new FileController();

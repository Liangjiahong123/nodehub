const fileService = require('../services/file');

class FileController {
  async create(ctx, next) {
    await fileService.create();
    console.log(ctx.request.file);
    ctx.body = '上传成功';
  }
}

module.exports = new FileController();

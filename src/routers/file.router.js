const KoaRouter = require('@koa/router');
const { handleAvatar } = require('../middlewares/file');
const { authVerify } = require('../middlewares/login');
const fileController = require('../controllers/file');
const { errCatch } = require('../utils/resFormat');

const fileRouter = new KoaRouter({ prefix: '/api/file' });

// 上传头像
fileRouter.post('/avatar', authVerify, handleAvatar, errCatch(fileController.create));

module.exports = fileRouter;

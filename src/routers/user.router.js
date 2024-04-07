const KoaRouter = require('@koa/router');
const userController = require('../controllers/user');
const { userVerify, userPwdCrypt, showUserAvatar } = require('../middlewares/user');
const { errCatch } = require('../utils/resFormat');

const userRouter = new KoaRouter({ prefix: '/api/users' });
// 创建用户
userRouter.post('/', userVerify, userPwdCrypt, errCatch(userController.create));
userRouter.get('/avatar/:userId', showUserAvatar);
module.exports = userRouter;

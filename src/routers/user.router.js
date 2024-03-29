const KoaRouter = require('@koa/router');
const userController = require('../controllers/user');
const { userVerify, userPwdCrypt } = require('../middlewares/user');
const { errCatch } = require('../utils/resFormat');

const userRouter = new KoaRouter({ prefix: '/api/users' });
userRouter.post('/', userVerify, userPwdCrypt, errCatch(userController.create));

module.exports = userRouter;

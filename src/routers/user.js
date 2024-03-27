const KoaRouter = require('@koa/router');
const userController = require('../controllers/user');
const { userVerify, userPwdCrypt } = require('../middlewares/user');

const userRouter = new KoaRouter({ prefix: '/api/users' });

userRouter.post('/', userVerify, userPwdCrypt, userController.create);

module.exports = userRouter;

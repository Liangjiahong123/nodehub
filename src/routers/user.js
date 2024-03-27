const KoaRouter = require('@koa/router');
const userController = require('../controllers/user');
const { userVerify } = require('../middlewares/user');

const userRouter = new KoaRouter({ prefix: '/api/users' });

userRouter.post('/', userVerify, userController.create);

module.exports = userRouter;

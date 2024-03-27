const KoaRouter = require('@koa/router');
const userController = require('../controllers/user');

const userRouter = new KoaRouter({ prefix: '/api/users' });

userRouter.post('/', userController.create);

module.exports = userRouter;

const KoaRouter = require('@koa/router');
const loginController = require('../controllers/login');
const { loginVerify } = require('../middlewares/login');
const loginRouter = new KoaRouter({ prefix: '/api/login' });

loginRouter.post('/', loginVerify, loginController.sign);

module.exports = loginRouter;

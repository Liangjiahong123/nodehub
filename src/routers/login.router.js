const KoaRouter = require('@koa/router');
const loginController = require('../controllers/login');
const { loginVerify } = require('../middlewares/login');
const { errCatch } = require('../utils/resFormat');

const loginRouter = new KoaRouter({ prefix: '/api/login' });
loginRouter.post('/', loginVerify, errCatch(loginController.sign));

module.exports = loginRouter;

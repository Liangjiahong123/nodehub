const KoaRouter = require('@koa/router');
const { authVerify } = require('../middlewares/login');
const momentController = require('../controllers/moment');
const monentRouter = new KoaRouter({ prefix: '/api/moment' });

monentRouter.post('/', authVerify, momentController.create);

module.exports = monentRouter;

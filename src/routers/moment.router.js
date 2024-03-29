const KoaRouter = require('@koa/router');
const { authVerify } = require('../middlewares/login');
const momentController = require('../controllers/moment');
const { errCatch } = require('../utils/resFormat');

const momentRouter = new KoaRouter({ prefix: '/api/moment' });
momentRouter.post('/', authVerify, errCatch(momentController.create));
momentRouter.get('/', errCatch(momentController.findAll));

module.exports = momentRouter;

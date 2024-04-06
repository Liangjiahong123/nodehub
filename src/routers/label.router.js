const KoaRouter = require('@koa/router');
const labelController = require('../controllers/label');
const { errCatch } = require('../utils/resFormat');
const { authVerify } = require('../middlewares/login');
const { labelVerify } = require('../middlewares/label');

const labelRouter = new KoaRouter({ prefix: '/api/label' });
labelRouter.post('/', authVerify, labelVerify, errCatch(labelController.create));

module.exports = labelRouter;

const KoaRouter = require('@koa/router');
const labelController = require('../controllers/label');
const { errCatch } = require('../utils/resFormat');
const { authVerify } = require('../middlewares/login');
const { createLabelVerify } = require('../middlewares/label');

const labelRouter = new KoaRouter({ prefix: '/api/label' });
labelRouter.post('/', authVerify, createLabelVerify, errCatch(labelController.create));
labelRouter.get('/', errCatch(labelController.findAll));

module.exports = labelRouter;

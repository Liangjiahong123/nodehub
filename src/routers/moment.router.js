const KoaRouter = require('@koa/router');
const { authVerify } = require('../middlewares/login');
const momentController = require('../controllers/moment');
const { errCatch } = require('../utils/resFormat');
const { verifyMomentPermission } = require('../middlewares/permission');

const momentRouter = new KoaRouter({ prefix: '/api/moment' });
momentRouter.post('/', authVerify, errCatch(momentController.create));
momentRouter.get('/', errCatch(momentController.findAll));
momentRouter.get('/:momentId', errCatch(momentController.findById));
momentRouter.put(
  '/:momentId',
  authVerify,
  verifyMomentPermission,
  errCatch(momentController.update)
);
momentRouter.delete(
  '/:momentId',
  authVerify,
  verifyMomentPermission,
  errCatch(momentController.remove)
);

module.exports = momentRouter;

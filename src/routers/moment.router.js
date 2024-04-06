const KoaRouter = require('@koa/router');
const { authVerify } = require('../middlewares/login');
const momentController = require('../controllers/moment');
const { errCatch } = require('../utils/resFormat');
const { verifyResourcePermission } = require('../middlewares/permission');
const { labelVerifyExists } = require('../middlewares/label');

const momentRouter = new KoaRouter({ prefix: '/api/moment' });
// 创建动态
momentRouter.post('/', authVerify, errCatch(momentController.create));
// 获取所有动态
momentRouter.get('/', errCatch(momentController.findAll));
// 获取动态详情
momentRouter.get('/:momentId', errCatch(momentController.findById));
// 修改动态
momentRouter.put(
  '/:momentId',
  authVerify,
  verifyResourcePermission,
  errCatch(momentController.update)
);
// 删除动态
momentRouter.delete(
  '/:momentId',
  authVerify,
  verifyResourcePermission,
  errCatch(momentController.remove)
);
// 创建动态标签
momentRouter.post(
  '/:momentId/labels',
  authVerify,
  verifyResourcePermission,
  labelVerifyExists,
  errCatch(momentController.addLabel)
);

module.exports = momentRouter;

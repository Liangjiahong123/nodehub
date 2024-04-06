const KoaRouter = require('@koa/router');
const { authVerify } = require('../middlewares/login');
const commentController = require('../controllers/comment');
const { errCatch } = require('../utils/resFormat');
const { verifyResourcePermission } = require('../middlewares/permission');

const commentRouter = new KoaRouter({ prefix: '/api/comment' });
commentRouter.post('/', authVerify, errCatch(commentController.create));
commentRouter.post('/reply', authVerify, errCatch(commentController.create));
commentRouter.delete(
  '/:commentId',
  authVerify,
  verifyResourcePermission,
  errCatch(commentController.remove)
);

module.exports = commentRouter;

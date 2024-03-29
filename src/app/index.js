const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRouter = require('../routers/user');
const loginRouter = require('../routers/login');

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

module.exports = app;

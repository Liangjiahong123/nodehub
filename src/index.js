require('./utils/errHandler');
const app = require('./app');
const { SERVER_PORT } = require('./config/server');

app.listen(SERVER_PORT, () => {
  console.log(`http://localhost:${SERVER_PORT}`);
});

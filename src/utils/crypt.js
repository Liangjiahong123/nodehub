const crypto = require('crypto');

module.exports = function md5Crypt(str) {
  const md5 = crypto.createHash('md5');
  const hashStr = md5.update(str).digest('hex');
  return hashStr;
};

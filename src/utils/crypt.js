const crypto = require('crypto');

module.exports = function md5Crypt(str) {
  str = String(str);
  const md5 = crypto.createHash('md5');
  const hashStr = md5.update(str).digest('hex');
  return hashStr;
};

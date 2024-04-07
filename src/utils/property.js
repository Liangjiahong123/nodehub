const { isObject } = require('./valid');

function pick(obj, props) {
  if (!isObject(obj)) return obj;

  const newObj = {};
  for (const key in obj) {
    if (props.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

function omit(obj, props) {
  if (!isObject(obj)) return obj;

  const newObj = {};
  for (const key in obj) {
    if (props.includes(key)) continue;
    newObj[key] = obj[key];
  }

  return newObj;
}

module.exports = { pick, omit };

function isObj(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return true;
}

function pick(obj, props) {
  if (!isObj(obj)) return obj;

  const newObj = {};
  for (const key in obj) {
    if (props.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

function omit(obj, props) {
  if (!isObj(obj)) return obj;

  const newObj = {};
  for (const key in obj) {
    if (props.includes(key)) continue;
    newObj[key] = obj[key];
  }

  return newObj;
}

module.exports = { pick, omit, isObj };

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

function mapRows(rows = [], props = []) {
  if (!rows.length || !props.length) return rows;

  return rows.map((row) => {
    const newRows = {};

    for (const prop of props) {
      if (prop.includes('.')) {
        const [outerKey, innerKey] = prop.split('.');
        if (!newRows[outerKey]) {
          newRows[outerKey] = {};
        }
        newRows[outerKey][innerKey] = row[prop];
      } else {
        newRows[prop] = row[prop];
      }
    }

    return newRows;
  });
}

module.exports = { pick, omit, mapRows };

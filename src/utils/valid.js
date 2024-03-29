function isUndefined(value) {
  return validHelper(value, 'Undefined');
}

function isNull(value) {
  return validHelper(value, 'Null');
}

function isString(value) {
  return validHelper(value, 'String');
}

function isObject(value) {
  return !isNull(value) && validHelper(value, 'Object');
}

function isArray(value) {
  return validHelper(value, 'Array');
}

function isFunction(value) {
  return validHelper(value, 'Function');
}

function isEmpty(value) {
  if (isArray(value) || isString(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (isObject(value)) return Reflect.ownKeys(value).length === 0;
  return false;
}

function validHelper(value, type) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

module.exports = {
  isUndefined,
  isNull,
  isEmpty,
  isObject,
  isArray,
  isString,
  isFunction
};

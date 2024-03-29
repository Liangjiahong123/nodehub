const fs = require('fs');
const path = require('path');

const keyPath = path.resolve(__dirname, 'keys');
const PRIVATE_KEY = fs.readFileSync(`${keyPath}/private.key`, { encoding: 'utf-8' });
const PUBLIC_KEY = fs.readFileSync(`${keyPath}/public.key`, { encoding: 'utf-8' });

module.exports = { PRIVATE_KEY, PUBLIC_KEY };

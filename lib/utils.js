'use strict';

const crypto = require('crypto');

function toTime(time) {
  return new Date(time).toISOString().replace(/[:\-]|\.\d{3}/g, '');
}

function toDate(time) {
  return toTime(time).substring(0, 8);
}

function hmac(key, dest, encoding) {
  return crypto
    .createHmac('sha256', key)
    .update(dest, 'utf8')
    .digest(encoding);
}

function hash(dest, encoding) {
  return crypto
    .createHash('sha256')
    .update(dest, 'utf8')
    .digest(encoding);
}

module.exports = {
  toTime,
  toDate,
  hmac,
  hash,
};

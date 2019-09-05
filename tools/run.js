'use strict';

const path = require('path');
const fs = require('fs');
const { check } = require('./checkCoverage');

const suitBaseDir = path.join(__dirname, '../test/aws-sig-v4-test-suite');

function run(suitSubPath = suitBaseDir) {
  const stat = fs.statSync(suitSubPath);
  if (!stat.isDirectory()) return;
  const dirs = fs.readdirSync(suitSubPath);
  for (let i = 0; i < dirs.length; i++) {
    const _dir = path.join(suitSubPath, dirs[i]);
    const _jsLikePath = path.join(_dir, 'jsLike.js');
    if (fs.existsSync(_jsLikePath)) {
      const _amzSrc = require(_jsLikePath);
      check(_amzSrc);
    }
    run(_dir);
  }
}

module.exports = {
  run,
};

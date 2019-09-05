/**
 * 将亚马逊的 suits 转换为 js 可识别模式
 * see doc: https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/API/sigv4-query-string-auth.html
 * author: xuanwei.lin@dianrong.com
 * date: 2018-07-27
 */

'use strict';

require('cliff');
const fs = require('fs');
const path = require('path');
const options = require('../amz-config');

const suitCase = 'get-utf8';
const amzAuthz = fs.readFileSync(path.join(__dirname, `${suitCase}.authz`)).toString('utf-8');
const amzCreq = fs.readFileSync(path.join(__dirname, `${suitCase}.creq`)).toString('utf-8');
const amzSts = fs.readFileSync(path.join(__dirname, `${suitCase}.sts`)).toString('utf-8');

const srcRequest = {
  method: 'GET',
  pathName: '/ሴ',
  headers: {
    host: options.host,
    'x-amz-date': options.amzTime,
  },
};

module.exports = {
  suitCase,
  srcRequest,
  amzAuthz,
  amzCreq,
  amzSts,
};

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
const options = require('../../amz-config');

const suitCase = 'post-sts-header-before';
const amzAuthz = fs.readFileSync(path.join(__dirname, `${suitCase}.authz`)).toString('utf-8');
const amzCreq = fs.readFileSync(path.join(__dirname, `${suitCase}.creq`)).toString('utf-8');
const amzSts = fs.readFileSync(path.join(__dirname, `${suitCase}.sts`)).toString('utf-8');

const srcRequest = {
  method: 'POST',
  pathName: '/',
  headers: {
    host: options.host,
    'x-amz-date': options.amzTime,
    'x-amz-security-token':
      'AQoDYXdzEPT//////////wEXAMPLEtc764bNrC9SAPBSM22wDOk4x4HIZ8j4FZTwdQWLWsKWHGBuFqwAeMicRXmxfpSPfIeoIYRqTflfKD8YUuwthAx7mSEI/qkPpKPi/kMcGdQrmGdeehM4IC1NtBmUpp2wUE8phUZampKsburEDy0KPkyQDYwT7WZ0wq5VSXDvp75YU9HFvlRd8Tx6q6fE8YQcHNVXAkiY9q6d+xo0rKwT38xVqr7ZD0u0iPPkUL64lIZbqBAz+scqKmlzm8FDrypNC9Yjc8fPOLn9FX9KSYvKTr4rvx3iSIlTJabIQwj2ICCR/oLxBA==',
  },
};

module.exports = {
  suitCase,
  srcRequest,
  amzAuthz,
  amzCreq,
  amzSts,
};

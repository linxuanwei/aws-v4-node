/**
 * 签名字符串
 * see doc: https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/API/sigv4-query-string-auth.html
 * author: xuanwei.lin@dianrong.com
 * date: 2018-07-26
 */
'use strict';

const { credentialScope, amzAlgorithm } = require('./credential');
const { toTime, hash } = require('../utils');

exports.stringToSign = function(time, region, service, request) {
  return [ amzAlgorithm, toTime(time), credentialScope(time, region, service), hash(request, 'hex') ].join('\n');
};

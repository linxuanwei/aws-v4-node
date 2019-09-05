/**
 * 签名计算
 * see doc: https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/API/sigv4-query-string-auth.html
 * author: xuanwei.lin@dianrong.com
 * date: 2018-07-26
 */

'use strict';

const { toDate, hmac } = require('../utils');

exports.calculate = (secret, time, region, service, stringToSign) => {
  const dateKey = hmac('AWS4' + secret, toDate(time));
  const dateRegionKey = hmac(dateKey, region);
  const dateRegionServiceKey = hmac(dateRegionKey, service);
  const signingKey = hmac(dateRegionServiceKey, 'aws4_request');
  return hmac(signingKey, stringToSign, 'hex');
};

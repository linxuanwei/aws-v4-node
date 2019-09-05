/**
 * API
 * using query string: http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
 * using authorization header: https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html
 * author: xuanwei.lin@dianrong.com
 * date: 2018-07-26
 */

'use strict';

const querystring = require('querystring');
const assert = require('assert');
const core = require('./lib/core');
const stringToSign = core.stringToSign;
const canonical = core.canonical;
const { calculate } = core.signature;
const { amzAlgorithm, amzCredential } = core.credential;
const { toTime } = require('./lib/utils');

// host is required
exports.presigned = function(method, path, headers, query, payload, options) {
  payload = payload || '';
  options = options || {};
  options.key = options.key;
  options.secret = options.secret;
  options.timestamp = options.timestamp || Date.now();
  options.region = options.region || 'us-east-1';
  options.service = options.service || 's3';
  assert(options.key && options.secret, 'aws-v4 key and secret must not be empty!');
  assert(headers.host, 'aws-v4 headers must include host!');

  const { key, secret, timestamp, region, service } = options;
  query = query ? querystring.parse(query) : {};

  const _credential = amzCredential(key, timestamp, region, service);
  const _signHeaders = canonical.signedHeaders(headers);
  const _canonicalRequest = canonical.createCanonicalRequest(method, path, query, headers, payload);
  const _sts = stringToSign(timestamp, region, service, _canonicalRequest);
  const _signature = calculate(secret, timestamp, region, service, _sts);

  // authz which can use for authorization headers
  return `${amzAlgorithm} Credential=${_credential}, SignedHeaders=${_signHeaders}, Signature=${_signature}`;
};

exports.amzDate = toTime;

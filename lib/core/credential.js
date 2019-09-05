'use strict';

const { toDate } = require('../utils');

module.exports = {
  // for X-Amz-Credential eg. AKIAIOSFODNN7EXAMPLE/20130721/us-east-1/s3/aws4_request
  amzCredential: (accessKey, time, region, service) => {
    return `${accessKey}/${credentialScope(time, region, service)}`;
  },
  amzAlgorithm: 'AWS4-HMAC-SHA256',
  credentialScope,
};

function credentialScope(time, region, service = 's3') {
  return [ toDate(time), region, service, 'aws4_request' ].join('/');
}

/**
 * 检验 AWS-V4 SDK 完备性（使用亚马逊自带的 test suits)
 * see doc: https://docs.aws.amazon.com/general/latest/gr/signature-v4-test-suite.html
 * author: xuanwei.lin@dianrong.com
 * date: 2018-07-27
 */

'use strict';

require('cliff');
const assert = require('assert');
const options = require('../test/aws-sig-v4-test-suite/amz-config');

const api = require('../index');
const core = require('../lib/core');
const stringToSign = core.stringToSign;
const canonical = core.canonical;

module.exports = {
  check({ suitCase, srcRequest, amzAuthz, amzCreq, amzSts }) {
    srcRequest.query = srcRequest.query || {};

    const creq = canonical.createCanonicalRequest(
      srcRequest.method,
      srcRequest.pathName,
      srcRequest.query,
      srcRequest.headers,
      srcRequest.payload || ''
    );
    assert(
      amzCreq === creq,
      `[${suitCase}] SDK 产生的 creq 与亚马逊给出的模板不符\n\n${JSON.stringify(amzCreq)}\n\n${JSON.stringify(creq)}\n`
    );

    const sts = stringToSign(options.timestamp, 'us-east-1', 'service', creq);
    assert(amzSts === sts, `[${suitCase}] SDK 产生的 sts 与亚马逊给出的模板不符\n\n${sts}\n`);

    const authz = api.presigned(
      srcRequest.method,
      srcRequest.pathName,
      srcRequest.headers,
      srcRequest.query,
      srcRequest.payload,
      options
    );

    assert(authz === amzAuthz, `[${suitCase}] SDK 产生的 authz 与亚马逊给出的模板不符\n\n${authz}\n`);

    console.log(`[pass][official-case]: ${suitCase}`.green);
  },
};

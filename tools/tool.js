'use strict';

// 计算各个aws签名参数的工具

require('cliff');
const api = require('../index');
const core = require('../lib/core');
const totime = require('../lib/utils').toTime;
const stringToSign = core.stringToSign;
const canonical = core.canonical;
const timestamp = 1536305067290;

const reqParams = {
  method: 'GET',
  pathName: '/client/apps/cms-backend/namespaces/default/release',
  headers: {
    host: 'config-center-dev.b8.dr.dianrong.io',
    'user-agent': 'CIS',
    'x-amz-date': totime(timestamp),
    'x-dianrong-app-id': 'cms-backend',
  },
  query: {},
  payload: '',
  awsOptions: {
    region: 'idc1',
    key: 'AK-dc4dafe7-2c3d-416f-8ae2-7f8ef1608829',
    secret: 'SK-7f063ea0-c26d-4c6c-89ce-019f80e53dd9',
    service: 'config-center',
    timestamp,
  },
};

function creq_(srcRequest) {
  return canonical.createCanonicalRequest(
    srcRequest.method,
    srcRequest.pathName,
    srcRequest.query,
    srcRequest.headers,
    srcRequest.payload || ''
  );
}

function sts_(creq) {
  return stringToSign(timestamp, 'idc1', 'config-center', creq);
}

function authorization_(srcRequest) {
  return api.presigned(
    srcRequest.method,
    srcRequest.pathName,
    srcRequest.headers,
    srcRequest.query,
    srcRequest.payload,
    srcRequest.awsOptions
  );
}

const resCreq = creq_(reqParams);
const resSts = sts_(resCreq);

console.log(resCreq, '\n\n', resSts, '\n\n', authorization_(reqParams));

'use strict';

const mock = require('egg-mock');
const amzDate = require('../index').amzDate;
const assert = require('power-assert');

describe('test/auth-aws-v4-nodejs.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/auth-aws-v4-nodejs-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect('hi, authAwsV4Nodejs')
      .expect(200);
  });
});

describe('aws-v4 should works', () => {
  it('aws offical suit case should all pass', () => {
    const { run } = require('../tools/run');
    run();
  });
});

describe('date should be amzDate', () => {
  it('amzDate should pass', () => {
    const exampleTimestamp = 1536219469017;
    assert(amzDate(exampleTimestamp) === '20180906T073749Z');
  });
});

/**
 * 规范化处理单元
 * see doc: https://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
 * author: xuanwei.lin@dianrong.com
 * date: 2018-07-26
 */

'use strict';

const assert = require('assert');
const path = require('path');
const { endsWith } = require('lodash');
const querystring = require('querystring');
const handleName = name => name.toLowerCase().trim();
const { hash } = require('../utils');

const canonicalRequest = exports;

canonicalRequest.httpVerb = method => method.toUpperCase();

canonicalRequest.canonicalUri = pathName => {
  const result = encodeURI(path.resolve(pathName));
  return endsWith(pathName, '/') && result !== '/' ? `${result}/` : result;
};

canonicalRequest.canonicalQueryString = query => {
  if (typeof query === 'string') query = querystring.parse(query) || {};
  assert(typeof query === 'object', 'canonicalRequest cannot recognise non-object queries');
  return Object.keys(query)
    .sort()
    .map(key => {
      let result = null;
      const value = query[key];
      const codedKey = encodeURI(key);
      if (Array.isArray(value)) {
        value.sort().forEach(v_ => {
          const codedV_ = v_ === '' ? v_ : encodeURI(v_);
          result = result ? result + `&${codedKey}=${codedV_}` : `${codedKey}=${codedV_}`;
        });
      } else {
        result = value === '' ? `${codedKey}=''` : `${codedKey}=${encodeURI(value)}`;
      }
      return result;
    })
    .join('&');
};

canonicalRequest.canonicalHeaders = headers => {
  const handleField = name => {
    return headers[name]
      .toString()
      .trim()
      .replace(/\s+/g, ' ');
  };

  return Object.keys(headers)
    .sort()
    .map(name => `${handleName(name)}:${handleField(name)}\n`)
    .join('');
};

canonicalRequest.signedHeaders = headers => {
  return Object.keys(headers)
    .sort()
    .map(name => handleName(name))
    .join(';');
};

canonicalRequest.createCanonicalRequest = (method, pathName, query, headers, payload) => {
  return [
    canonicalRequest.httpVerb(method),
    canonicalRequest.canonicalUri(pathName),
    canonicalRequest.canonicalQueryString(query),
    canonicalRequest.canonicalHeaders(headers),
    canonicalRequest.signedHeaders(headers),
    hash(new Buffer(payload), 'hex'),
  ].join('\n');
};

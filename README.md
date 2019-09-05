# @dr/auth-aws-v4-nodejs

A cis plugin of @dr/auth-aws-v4-nodejs

## Install

```shell
npm i @dr/auth-aws-v4-nodejs --save
```

## Usage

```js
const awsV4 = require('@dr/auth-aws-v4-nodejs');
const authz = awsV4.presigned (method, path, headers, query, payload, options)
```

## options

  - key 
  - secret 
  - timestamp 时间戳,精确到毫秒 default: Date.now()
  - region default: us-east-1
  - service default: s3

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

## Author

Dianrong Node Team
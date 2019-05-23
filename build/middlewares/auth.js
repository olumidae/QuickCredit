'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var auth = function auth() {
  var secret = process.env.secret;

  return (0, _jsonwebtoken2.default)({ secret: secret });
};

var hashPassword = function hashPassword(password) {
  return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(10));
};

exports.default = { auth: auth, hashPassword: hashPassword };
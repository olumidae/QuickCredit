'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserLoginValidator = function UserLoginValidator(user) {
  var loginformat = _joi2.default.object().keys({
    email: _joi2.default.string().email(),
    password: _joi2.default.string().min(6).required()
  }).with('email', 'password');
  return _joi2.default.validate(user, loginformat);
};

var signupValidator = function signupValidator(user) {
  var signupFormat = {
    firstName: _joi2.default.string().min(3).trim().required(),
    lastName: _joi2.default.string().min(3).required(),
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().regex(/^[a-zA-Z0-9]{4,8}$/).min(4).required(),
    address: _joi2.default.string().min(3),
    status: _joi2.default.string().valid('verified', 'unverified'),
    isAdmin: _joi2.default.boolean().valid('true', 'false'),
    isLoggedIn: _joi2.default.boolean().valid('true', 'false')
  };
  return _joi2.default.validate(user, signupFormat);
};

var verifyUserValidator = function verifyUserValidator(user) {
  var updateFormat = {
    status: _joi2.default.string().valid('verified', 'unverified').required(),
    verifiedBy: _joi2.default.string()

  };
  return _joi2.default.validate(user, updateFormat);
};

exports.default = {
  verifyUserValidator: verifyUserValidator,
  signupValidator: signupValidator,
  UserLoginValidator: UserLoginValidator
};
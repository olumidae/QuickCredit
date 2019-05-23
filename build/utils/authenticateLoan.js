'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyValidator = function applyValidator(loan) {
  var applyFormat = {
    firstName: _joi2.default.string().required(),
    lastName: _joi2.default.string().required(),
    address: _joi2.default.string().required(),
    email: _joi2.default.string().email().required().label('Email is required'),
    tenor: _joi2.default.number().max(12).required(),
    amount: _joi2.default.number().required(),
    status: _joi2.default.string().valid('pending', 'approved', 'rejected'),
    repaid: _joi2.default.boolean().valid('true', 'false'),
    interest: _joi2.default.number(),
    paymentInstallment: _joi2.default.number(),
    balance: _joi2.default.number()
  };
  return _joi2.default.validate(loan, applyFormat);
};

var approveValidator = function approveValidator(loan) {
  var approveFormat = {
    status: _joi2.default.string().valid('pending', 'approved', 'rejected').required(),
    approvedBy: _joi2.default.string()
  };
  return _joi2.default.validate(loan, approveFormat);
};

exports.default = {
  applyValidator: applyValidator,
  approveValidator: approveValidator
};
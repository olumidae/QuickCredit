'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var repaymentValidator = function repaymentValidator(amount) {
  var repayFormat = {
    loanId: _joi2.default.number().required(),
    amount: _joi2.default.number().required(),
    dateCreated: _joi2.default.date().required(),
    isPaid: _joi2.default.bool().required()
  };
  return _joi2.default.validate(amount, repayFormat);
};

exports.default = repaymentValidator;
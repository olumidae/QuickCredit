'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _loanModel = require('../models/loanModel');

var _loanModel2 = _interopRequireDefault(_loanModel);

var _repaymentModel = require('../models/repaymentModel');

var _repaymentModel2 = _interopRequireDefault(_repaymentModel);

var _authenticateRepayment = require('../utils/authenticateRepayment');

var _authenticateRepayment2 = _interopRequireDefault(_authenticateRepayment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.secret;


var repaymentsController = {
  getAllRepayments: function getAllRepayments(req, res) {
    if (!_repaymentModel2.default.repayments.length) {
      return res.status(404).json({ status: 404, error: 'No repayments(s) found' });
    }

    return res.status(200).json({ status: 200, data: _repaymentModel2.default.repayments });
  },

  repayLoan: function repayLoan(req, res) {
    // Validating
    // admin to post loan repayment
    var _repaymentValidator = (0, _authenticateRepayment2.default)(req.body),
        error = _repaymentValidator.error;

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    var id = req.params.id;

    var loanTorepay = _loanModel2.default.loans.find(function (loan) {
      return loan.id === Number(id) && loan.repaid !== 'true';
    });

    if (!loanTorepay) {
      return res.status(400).json({ status: 400, error: 'The specified unrepaid loan is not found !!' });
    }

    var newrepayloan = _repaymentModel2.default.repayments.find(function (newLoan) {
      return newLoan.loanId === req.body.loanId && newLoan.createdOn === (0, _moment2.default)().format('LL');
    });

    if (newrepayloan) {
      return res.status(400).json({ status: 400, error: 'This installment is already recorded' });
    }

    newrepayloan = _repaymentModel2.default.repayLoan(req.body, res);

    var token = _jsonwebtoken2.default.sign({ sub: newrepayloan.id }, secret);
    return res.status(201).json({ status: 201, message: 'The loan repayment was successfully recorded', data: newrepayloan, token: token });
  },

  repaymentsHistory: function repaymentsHistory(req, res) {
    var myrepayments = _repaymentModel2.default.repayments.find(function (loan) {
      return loan.loanId === req.params.loanId;
    });

    if (!myrepayments) {
      return res.status(404).json({ status: 404, error: 'No repayments for the loan  ' + req.params.loanId + ' found' });
    }

    return res.status(200).json({ status: 200, data: myrepayments });
  }

};
exports.default = repaymentsController;
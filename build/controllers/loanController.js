'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _loanModel = require('../models/loanModel');

var _loanModel2 = _interopRequireDefault(_loanModel);

var _authenticateLoan = require('../utils/authenticateLoan');

var _authenticateLoan2 = _interopRequireDefault(_authenticateLoan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.secret;


var loanController = {
  getAllLoans: function getAllLoans(req, res) {
    if (!_loanModel2.default.loans.length) {
      return res.status(404).json({ status: 404, error: 'No loan found' });
    }

    var _req$query = req.query,
        status = _req$query.status,
        repaid = _req$query.repaid;

    if (status === 'approved' && repaid === 'false') {
      var unpaidLoans = _loanModel2.default.loans.filter(function (unpaid) {
        return unpaid.status === 'approved' && unpaid.repaid === 'false';
      });
      if (unpaidLoans.length > 0) {
        return res.status(200).json({ status: 200, data: unpaidLoans });
      }
      return res.status(404).json({ status: 404, message: 'there are no unpaid loans' });
    }

    if (status === 'approved' && repaid === 'true') {
      var repaidLoan = _loanModel2.default.loans.filter(function (paid) {
        return paid.status === 'aprroved' && paid.repaid === 'true';
      });
      return res.status(200).json({ status: 200, data: repaidLoan });
    }

    return res.status(200).json({ status: 200, data: _loanModel2.default.loans });
  },

  applyForLoan: function applyForLoan(req, res) {
    // Validating
    var _authenticateLoan$app = _authenticateLoan2.default.applyValidator(req.body),
        error = _authenticateLoan$app.error;

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    var isloggedin = _userModel2.default.UserData.find(function (user) {
      return user.email === req.body.user && user.isLoggedIn === 'true' && user.isAdmin === 'false';
    });
    if (!isloggedin) return res.status(400).json({ status: 400, error: 'You must  be logged in to request a loan' });

    var isVerified = _userModel2.default.UserData.find(function (user) {
      return user.email === req.body.user && user.status === 'verified';
    });
    if (!isVerified) return res.status(400).json({ status: 400, error: 'You are not allowed to request a loan, your account is not verified' });

    var newloan = _loanModel2.default.loans.find(function (loan) {
      return loan.user === req.body.user && loan.repaid !== 'true';
    });

    if (newloan) {
      return res.status(400).json({ status: 400, error: 'Dear client, you have an unrepaid loan!' });
    }

    newloan = _loanModel2.default.applyForLoan(req.body);
    // const token = webtoken.sign({ sub: newloan.id }, config.secret);
    return res.status(201).json({
      status: 201, message: 'The loan request was successful', data: newloan /** token */
    });
  },

  loansListByStatus: function loansListByStatus(req, res) {
    var verifyLoan = _loanModel2.default.loans.find(function (loan) {
      return loan.status === req.params.status;
    });

    if (!verifyLoan) {
      return res.status(404).json({ status: 404, error: 'No ' + req.params.status + ' loan(s) found' });
    }

    return res.status(200).json({ status: 200, data: verifyLoan });
  },

  approveLoan: function approveLoan(req, res) {
    // validate data
    var _authenticateLoan$app2 = _authenticateLoan2.default.approveValidator(req.body),
        error = _authenticateLoan$app2.error;

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    // const isloggedAsAdmin = userModel.users.find(user => user.email === req.body.approvedBy && user.isLoggedIn === 'true' && user.isAdmin === 'true');
    // if (!isloggedAsAdmin) {
    //   return res.status(400).json({ status: 400, error: 'You are not allowed to approve the loan request. Log in as Admin' });
    // }

    var pendingLoan = _loanModel2.default.loans.find(function (loan) {
      return loan.user === req.params.user && loan.status === 'pending';
    });
    if (!pendingLoan) return res.status(404).json({ status: 404, error: 'The are no pending loan requests' });

    pendingLoan.status = req.body.status;

    // return update

    pendingLoan = _loanModel2.default.loans.find(function (loan) {
      return loan.user === req.params.user;
    });

    var token = _jsonwebtoken2.default.sign({ sub: pendingLoan.id }, secret);
    return res.status(200).json({ status: 200, message: 'User marked as verified', data: pendingLoan, token: token
    });
  },

  getSpecificLoan: function getSpecificLoan(req, res) {
    var id = req.params.id;

    var getLoanById = _loanModel2.default.loans.find(function (loan) {
      return loan.id === Number(id);
    });

    if (!getLoanById) {
      return res.status(404).json({ status: 404, error: 'Loan does not exist' });
    }

    return res.status(200).json({ status: 200, data: getLoanById });
  }

};
exports.default = loanController;
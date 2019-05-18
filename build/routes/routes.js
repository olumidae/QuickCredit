'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _loanController = require('../controllers/loanController');

var _loanController2 = _interopRequireDefault(_loanController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _repaymentController = require('../controllers/repaymentController');

var _repaymentController2 = _interopRequireDefault(_repaymentController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create the express router that will have all endpoints
var router = _express2.default.Router();

// Registration Handler
router.get('/users', _userController2.default.getAllUsers);
router.post('/auth/signup', _userController2.default.signUp); // w
router.post('/auth/signin', _userController2.default.logIn); // w
router.patch('/users/:email', _userController2.default.verifyUser); // w

// Loan Handler
router.get('/loans/:id', _loanController2.default.getSpecificLoan); //
// router.get('/loans?status=approved&repaid=false', Payment.unpaidLoan);
// router.get('/loans?status=approved&repaid=true', Payment.paidLoan);
router.get('/loans', _loanController2.default.getAllLoans); // works
router.get('/loans/:id/repayments', _repaymentController2.default.repaymentsHistory);
router.post('/loans', _loanController2.default.applyForLoan); // works
router.patch('loans/:id', _loanController2.default.approveLoan);
router.post('/loans/:id/repayment', _repaymentController2.default.repayLoan); //
exports.default = router;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _loanModel = require('./loanModel');

var _loanModel2 = _interopRequireDefault(_loanModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repayments = function () {
  function Repayments() {
    _classCallCheck(this, Repayments);

    this.repayments = [];
  }

  _createClass(Repayments, [{
    key: 'repayLoan',
    value: function repayLoan(info, res) {
      var newRepay = {
        id: this.repayments.length + 1,
        createdOn: (0, _moment2.default)().format('LL'),
        loanId: parseInt(info.loanId),
        amount: parseFloat(info.amount)

      };

      var loan = _loanModel2.default.loans.find(function (l) {
        return l.id === info.loanId;
      });

      // if (loan.balance < info.amount) return res.status(404).json({ status: 404, error: `Error! the repay amount is greater than the loan balance:  ${loan.balance}` });
      // loan.balance = parseFloat(loan.balance) - parseFloat(info.amount);

      this.repayments.push(newRepay);
      return newRepay;
    }
  }]);

  return Repayments;
}();

exports.default = new Repayments();
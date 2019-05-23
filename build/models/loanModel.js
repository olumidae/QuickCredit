'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loans = function () {
  function Loans() {
    _classCallCheck(this, Loans);

    this.loans = [];
  }

  _createClass(Loans, [{
    key: 'applyForLoan',
    value: function applyForLoan(info) {
      var interest = parseFloat(info.amount) * 0.05;
      var balance = parseFloat(info.amount) + interest;
      var newLoan = {
        id: this.loans.length + 1,
        user: info.user,
        createdOn: new Date().toString(),
        status: 'pending',
        repaid: false,
        tenor: parseFloat(info.tenor),
        amount: parseFloat(info.amount),
        interest: interest,
        paymentInstallment: balance / parseFloat(info.tenor),
        balance: balance
      };
      this.loans.push(newLoan);
      return newLoan;
    }
  }]);

  return Loans;
}();

exports.default = new Loans();
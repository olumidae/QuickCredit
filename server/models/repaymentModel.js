import moment from 'moment';
import loanModel from './loanModel';

class Repayments {
  constructor() {
    this.repayments = [];
  }

  repayLoan(info, res) {
    const newRepay = {
      id: this.repayments.length + 1,
      createdOn: moment().format('LL'),
      loanId: parseInt(info.loanId),
      amount: parseFloat(info.amount),

    };

    const loan = loanModel.loans.find(l => l.id === info.loanId);

    // if (loan.balance < info.amount) return res.status(404).json({ status: 404, error: `Error! the repay amount is greater than the loan balance:  ${loan.balance}` });
    // loan.balance = parseFloat(loan.balance) - parseFloat(info.amount);

    this.repayments.push(newRepay);
    return newRepay;
  }
}

export default new Repayments();

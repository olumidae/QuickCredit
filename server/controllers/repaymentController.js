import webtoken from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config.json';
import loanModel from '../models/loanModel';
import repaymentsModel from '../models/repaymentModel';
import authenticateRepayment from '../utils/authenticateRepayment';

const repaymentsController = {
  getAllRepayments: (req, res) => {
    if (!repaymentsModel.repayments.length) {
      return res.status(404).json({ status: 404, error: 'No repayments(s) found' });
    }

    return res.status(200).json({ status: 200, data: repaymentsModel.repayments });
  },

  repayLoan: (req, res) => {
    // Validating
    // admin to post loan repayment
    const { error } = authenticateRepayment.repayValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }


    const loanTorepay = loanModel.loans.find(loan => loan.id === req.body.loanId && loan.repaid !== 'true');

    if (!loanTorepay) {
      return res.status(400).json({ status: 400, error: 'The specified unrepaid loan is not found !!' });
    }

    let newrepayloan = repaymentsModel.repayments.find(newLoan => newLoan.loanId === req.body.loanId && newLoan.createdOn === moment().format('LL'));

    if (newrepayloan) {
      return res.status(400).json({ status: 400, error: 'This installment is already recorded' });
    }

    newrepayloan = repaymentsModel.repayLoan(req.body, res);

    const token = webtoken.sign({ sub: newrepayloan.id }, config.secret);
    res.status(201).json({ status: 201, message: 'The loan repayment was successfully recorded', data: newrepayloan, token });
  },

  unpaidLoan(req, res) {

    const unpaidLoans = loanModel.loans.filter(loan => loan.status === 'approved' && loan.repaid === 'false');
    if (unpaidLoans.length > 0) {
      return res.status(200).json({
        status: 200,
        data: unpaidLoans,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'They are no unpaid loans',
    });
  },

  paidLoan(req, res) {
    let status = req.query;
    const paidLoans = loanModel.loans.filter(loan => loan.status === 'approved' && loan.repaid === 'true');
    if (paidLoans.length > 0) {
      return res.status(200).json({
        status: 200,
        data: paidLoans,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'They are no paid loans',
    });
  },


  repaymentsHistory: (req, res) => {
    const myrepayments = repaymentsModel.repayments.find(loan => loan.loanId === req.params.loanId);

    if (!myrepayments) {
      return res.status(404).json({ status: 404, error: `No repayments for the loan  ${req.params.loanId} found` });
    }

    return res.status(200).json({ status: 200, data: myrepayments });
  },

};
export default repaymentsController;

import webtoken from 'jsonwebtoken';
import moment from 'moment';
<<<<<<< HEAD
import dotenv from 'dotenv';
=======

>>>>>>> 582a65dc45140a266f1f4ab6312d39c022d5d742
import loanModel from '../models/loanModel';
import repaymentsModel from '../models/repaymentModel';
import repaymentValidator from '../utils/authenticateRepayment';

dotenv.config();
const { secret } = process.env;

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
    const { error } = repaymentValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    const { id } = req.params;
    const loanTorepay = loanModel.loans.find(loan => loan.id === Number(id) && loan.repaid !== 'true');

    if (!loanTorepay) {
      return res.status(400).json({ status: 400, error: 'The specified unrepaid loan is not found !!' });
    }

    let newrepayloan = repaymentsModel.repayments.find(newLoan => newLoan.loanId === req.body.loanId && newLoan.createdOn === moment().format('LL'));

    if (newrepayloan) {
      return res.status(400).json({ status: 400, error: 'This installment is already recorded' });
    }

    newrepayloan = repaymentsModel.repayLoan(req.body, res);

<<<<<<< HEAD
    const token = webtoken.sign({ sub: newrepayloan.id }, secret);
=======
    const token = webtoken.sign({ sub: newrepayloan.id }, process.env.secret);
>>>>>>> 582a65dc45140a266f1f4ab6312d39c022d5d742
    return res.status(201).json({ status: 201, message: 'The loan repayment was successfully recorded', data: newrepayloan, token });
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

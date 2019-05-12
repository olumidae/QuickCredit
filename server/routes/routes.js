import express from 'express';

import User from '../controllers/userController';
import Loan from '../controllers/loanController';
import Payment from '../controllers/repaymentController';
// create the express router that will have all endpoints
const router = express.Router();


// Registration Handler
router.get('/api/v1/users', User.getAllUsers);
router.post('/api/v1/auth/signup', User.signUp);
router.post('/api/v1/auth/signin', User.logIn);
router.patch('/api/v1/users/:email', User.verifyUser);

// Loan Handler
router.get('api/v1//<:loan-id>', Loan.getSpecificLoan);
router.get('api/v1/loans?status=approved&repaid=false', Payment.unpaidLoan);
router.get('api/v1/loans?status=approved&repaid=true', Payment.paidLoan);
router.get('api/v1/loans/', Loan.getAllLoans);
router.get('/api/v1/loans/<:loan-id>/repayments', Payment.repaymentsHistory);
router.post('/api/v1/loans', Loan.applyForLoan);
router.patch('api/v1//<:loan-id>', Loan.approveLoan);
router.post('api/v1/loans/<:loan-id>/repayment', Payment.repayLoan);
export default router;

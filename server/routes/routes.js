import express from 'express';

import Loan from '../controllers/loanController';
// import User from '../controllers/userController';
import Users from '../db/controller/users';
import Payment from '../controllers/repaymentController';
// create the express router that will have all endpoints
const router = express.Router();


// Registration Handler
// router.get('/users', User.getAllUsers);
router.post('/auth/signup', Users.signupUser); // w
// router.post('/auth/signin', User.logIn); // w
// router.patch('/users/:email', User.verifyUser); // w

// Loan Handler
router.get('/loans/:id', Loan.getSpecificLoan); //
// router.get('/loans?status=approved&repaid=false', Payment.unpaidLoan);
// router.get('/loans?status=approved&repaid=true', Payment.paidLoan);
router.get('/loans', Loan.getAllLoans); // works
router.get('/loans/:id/repayments', Payment.repaymentsHistory);
router.post('/loans', Loan.applyForLoan); // works
router.patch('loans/:id', Loan.approveLoan);
router.post('/loans/:id/repayment', Payment.repayLoan); //
export default router;

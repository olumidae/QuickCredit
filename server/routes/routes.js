import express from 'express';
import Auth from '../middlewares/auth';
import AuthController from '../controller/auth';

// create the express router that will have all endpoints
const router = express.Router();


// Registration Handler
// router.get('/users', User.getAllUsers);
router.post('/auth/signup', Auth.authSignUp, AuthController.signUp); // w
router.post('/auth/login', Auth.login, AuthController.login);

// router.patch('/users/:email', User.verifyUser);
// Loan Handler
// router.get('/loans/:id', Loan.getSpecificLoan);
// router.get('/loans?status=approved&repaid=false', Payment.unpaidLoan);
// router.get('/loans?status=approved&repaid=true', Payment.paidLoan);
// router.get('/loans', Loan.getAllLoans); // works
// router.get('/loans/:id/repayments', Payment.repaymentsHistory);
// router.post('/loans', Loan.createLoan); // works
// router.patch('loans/:id', Loan.approveLoan);
// router.post('/loans/:id/repayment', Payment.repayLoan); //
export default router;

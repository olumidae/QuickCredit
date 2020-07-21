import express from 'express';
import Validate from '../middlewares/validateUser';
import AuthController from '../controller/auth';
import Auth from '../middlewares/auth';
import AdminController from '../controller/admin';

// create the express router that will have all endpoints
const router = express.Router();


// Registration Handler
// router.get('/users', User.getAllUsers);
router.post('/auth/signup', Validate.userSignUp, AuthController.signUp); // w
router.post('/auth/login', Validate.login, AuthController.login);

// router.patch('/users/:email/verify', tokenValidator.validateAdminToken);
router.patch('/users/:email/verify', Auth.Admin, AdminController.verify);
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

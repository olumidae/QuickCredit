import express from 'express';
import Validate from '../middlewares/validateUser';
import Auth from '../middlewares/auth';
import ValidateLoan from '../middlewares/validateLoan';
import { AuthController, AdminController, UserController } from '../controller';

// create the express router that will have all endpoints
const router = express.Router();


// Registration Handler
// router.get('/users', User.getAllUsers);
router.post('/auth/signup', Validate.userSignUp, AuthController.signUp); // w
router.post('/auth/login', Validate.login, AuthController.login);
router.post('auth/forgot_password', AuthController.sendResetLink);
router.delete('/auth/deleteuser', Validate.delete, AdminController.deleteUser);

router.post('/loans', Auth.User, ValidateLoan.validate, UserController.createLoan); // create a loan
router.patch('/users/:email/verify', Auth.Admin, AdminController.verify); // verify user
router.get('/loans', Auth.Admin, AdminController.getAllLoans); // get all loans

// Loan Handler
// router.get('/loans/:id', Loan.getSpecificLoan);
// router.get('/loans?status=approved&repaid=false', Payment.unpaidLoan);
// router.get('/loans?status=approved&repaid=true', Payment.paidLoan);
// router.get('/loans/:id/repayments', Payment.repaymentsHistory);
// router.patch('loans/:id', Loan.approveLoan);
// router.post('/loans/:id/repayment', Payment.repayLoan); //
export default router;

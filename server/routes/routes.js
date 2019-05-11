import express from 'express';

import User from '../controllers/userController';
import Loan from '../controllers/loanController';
// create the express router that will have all endpoints
const router = express.Router();


// Registration Handler
router.get('/api/v1/users', User.getAllUsers);
router.post('/api/v1/auth/signup', User.signUp);
router.post('/api/v1/auth/signin', User.logIn);
router.patch('/api/v1/users/:email', User.verifyUser);

// Loan Handler
router.get('api/v1/loans', Loan.getAllLoans);
router.post('/api/v1/loans/apply', Loan.applyForLoan);


export default router;

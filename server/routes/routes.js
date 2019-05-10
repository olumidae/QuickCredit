import express from 'express';

import User from '../controllers/userController';
// create the express router that will have all endpoints
const router = express.Router();


// Registration Handler
router.get('/api/v1/users', User.getAllUsers);
router.post('/api/v1/auth/signup', User.signUp);


module.exports = router;

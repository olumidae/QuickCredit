import express from 'express';


import User from '../controllers/userController';
// create the express router that will have all endpoints
const router = express.Router();


// Sign Up Route
router.get('/api/v1/auth/signin', (req, res) => res.send('Login'));

// Sign In
router.get('/api/v1/auth/signup', (req, res) => res.send('SignUp Page'));


// Registration Handler
router.post('/api/v1/auth/signup', User.signUp);


module.exports = router;

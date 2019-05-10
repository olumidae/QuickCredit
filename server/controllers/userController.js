import webtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.json';
import userModel from '../models/userModel';
import authenticateUser from '../utils/authenticateUser';

const UserController = {
  getAllUsers: (req, res) => {
    if (!userModel.UserData.length) {
      return res.status(404).json({ status: 404, error: 'No user(s) found' });
    }

    return res.status(200).json({ status: 200, data: userModel.UserData });
  },

  signUp: (req, res) => {
    const { error } = authenticateUser.signupValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }

    let signupUser = userModel.UserData.find(user => user.email === req.body.email);

    if (signupUser) {
      return res.status(400).json({ status: 400, error: 'This email has been registered!' });
    }

    signupUser = userModel.signUp(req.body);

    const token = webtoken.sign({ sub: signupUser.id }, config.secret);
    res.status(201).json({
      status: 201, message: 'Successfully registered', data: signupUser, token,
    });
  },

  verifyUser: (req, res) => {
    // validate data
    const { error } = authenticateUser.verifyUserValidator(req.body);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }

    const isloggedAsAdmin = userModel.UserData.find(user => user.email === req.body.verifiedBy && user.isLoggedIn === 'true' && user.isAdmin === 'true');
    if (!isloggedAsAdmin) {
      return res.status(400).json({ status: 400, error: 'You are not allowed to verify the clients user account. Log in as Admin' });
    }


    // Check if user exists

    let updateuser = userModel.UserData.find(user => user.email === req.params.email);
    if (!updateuser) {
      return res
        .status(404)
        .json({ status: 404, error: 'The user does not exist' });
    }

    if (updateuser.status === 'verified') {
      return res
        .status(400)
        .json({
          status: 400,
          error: 'The user already marked as verified',
        });
    }

    updateuser.status = req.body.status;

    // return update

    updateuser = userModel.UserData.find(user => user.email === req.params.email);

    const token = webtoken.sign({ sub: updateuser.id }, config.secret);
    res.status(200).json({
      status: 200,
      message: 'User marked as verified',
      data: updateuser,
      token,
    });
  },

  logIn: (req, res) => {
    // Validating
    const { error } = authenticateUser.UserLoginValidator(req.body);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });
    }

    // Check email
    const loggeduser = userModel.UserData.find(u => u.email === req.body.email);
    if (!loggeduser) {
      res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });
    }
    // password
    else {
      const comparePasswords = bcrypt.compareSync(req.body.password, loggeduser.password);
      if (!comparePasswords) {
        return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });
      }

      // Generate token
      const token = webtoken.sign({ sub: loggeduser.id }, config.secret);
      // user isloggedIn
      loggeduser.isLoggedIn = 'true';
      res.status(200).json({status: 200, message: 'Logged In Successfully', data: loggeduser, token });
    }
  },

};

export default UserController;

import webtoken from 'jsonwebtoken';
import authenticateUser from '../utils/authenticateUser';
import usermodel from '../models/userModel';
import config from '../config/config.json';

const UserController = {
  getAllUsers: (req, res) => {
    if (!usermodel.UserData.length) { 
      return res.status(404).json({status: 404, error: 'No user(s) found' });
    }

    return res.status(200).json({ status: 200, data: usermodel.UserData });
  },

  signUp: (req, res) => {
    const { error } = authenticateUser.signupValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }
    
    let signupUser = usermodel.UserData.find(user => user.email === req.body.email);

    if (signupUser) {
      return res.status(400).json({ status: 400, error: 'This email has been registered!' });
    }

    signupUser = usermodel.UserData.signUp(req.body);

    const token = webtoken.sign({ sub: signupUser.id }, config.secret);
    res.status(201).json({
      status: 201, message: 'Successfully registered', data: signupUser, token,
    });
  },

  verifyUser: (req, res) => {
    // validate data
    const { error } = authenticateUser.verifyUserValidator(req.body);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });
    }

    const isloggedAsAdmin = usermodel.UserData.find(user => user.email === req.body.verifiedBy && user.isLoggedIn === 'true' && user.isAdmin === 'true');
    if (!isloggedAsAdmin) {
      return res.status(400).json({ status: 400, error: 'You are not allowed to verify the clients user account. Log in as Admin' });
    }


    // Check if user exists

    let updateuser = usermodel.UserData.find(user => user.email === req.params.email);
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

    updateuser = usermodel.UserData.find(user => user.email === req.params.email);

    const token = webtoken.sign({ sub: updateuser.id }, config.secret);
    res.status(200).json({
      status: 200,
      message: 'User marked as verified',
      data: updateuser,
      token,
    });
  },
};

export default UserController;

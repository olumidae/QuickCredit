'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _authenticateUser = require('../utils/authenticateUser');

var _authenticateUser2 = _interopRequireDefault(_authenticateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var secret = process.env.secret;


var UserController = {
  getAllUsers: function getAllUsers(req, res) {
    if (!_userModel2.default.UserData.length) {
      return res.status(404).json({ status: 404, error: 'No user(s) found' });
    }

    return res.status(200).json({ status: 200, data: _userModel2.default.UserData });
  },

  signUp: function signUp(req, res) {
    var _authenticateUser$sig = _authenticateUser2.default.signupValidator(req.body),
        error = _authenticateUser$sig.error;

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    var signupUser = _userModel2.default.UserData.find(function (user) {
      return user.email === req.body.email;
    });

    if (signupUser) {
      return res.status(400).json({ status: 400, error: 'This email has been registered!' });
    }

    signupUser = _userModel2.default.signUp(req.body);

    var token = _jsonwebtoken2.default.sign({ sub: signupUser.id }, secret);
    res.status(201).json({
      status: 201,
      message: 'Successfully registered',
      data: {
        id: signupUser.id,
        firstName: signupUser.firstName,
        lastName: signupUser.lastName,
        email: signupUser.email
      },
      token: token
    });
  },

  verifyUser: function verifyUser(req, res) {
    // validate data
    var _authenticateUser$ver = _authenticateUser2.default.verifyUserValidator(req.body),
        error = _authenticateUser$ver.error;

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    // const isloggedAsAdmin = userModel.UserData.find(user => user.email === req.body.verifiedBy && user.isLoggedIn === 'true' && user.isAdmin === 'true');
    // if (!isloggedAsAdmin) {
    //   return res.status(400).json({ status: 400, error: 'You are not allowed to verify the clients user account. Log in as Admin' });
    // }

    // Check if user exists
    var updateUser = _userModel2.default.UserData.find(function (user) {
      return user.email === req.params.email;
    });
    if (!updateUser) {
      return res.status(404).json({ status: 404, error: 'The user does not exist' });
    }

    if (updateUser.status === 'verified') {
      return res.status(400).json({
        status: 400,
        error: 'The user already marked as verified'
      });
    }

    updateUser.status = req.body.status;

    // return update

    updateUser = _userModel2.default.UserData.find(function (user) {
      return user.email === req.params.email;
    });

    var token = _jsonwebtoken2.default.sign({ sub: updateUser.id }, secret);
    res.status(200).json({
      status: 200,
      message: 'User marked as verified',
      data: {
        id: updateUser.id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        address: updateUser.address,
        status: updateUser.status,
        isLoggedIn: updateUser.isLoggedIn
      },
      token: token
    });
  },

  logIn: function logIn(req, res) {
    // Validating
    var _authenticateUser$Use = _authenticateUser2.default.UserLoginValidator(req.body),
        error = _authenticateUser$Use.error;

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }

    // Check email
    var loggeduser = _userModel2.default.UserData.find(function (user) {
      return user.email === req.body.email;
    });
    if (!loggeduser) {
      res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });
    }
    // password
    else {
        var comparePasswords = _bcrypt2.default.compareSync(req.body.password, loggeduser.password);
        if (!comparePasswords) {
          return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });
        }

        // Generate token
        var token = _jsonwebtoken2.default.sign({ sub: loggeduser.id }, secret);
        // user isloggedIn
        loggeduser.isLoggedIn = 'true';
        return res.status(200).json({
          status: 200,
          message: 'Logged In Successfully',
          data: {
            id: loggeduser.id,
            firstName: loggeduser.firstName,
            lastName: loggeduser.lastName,
            email: loggeduser.email,
            address: loggeduser.address,
            status: loggeduser.status,
            isLoggedIn: loggeduser.isLoggedIn,
            isAdmin: loggeduser.isAdmin
          },
          token: token
        });
      }
  }

};

exports.default = UserController;
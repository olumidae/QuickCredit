import jo from 'joi';

const UserLoginValidator = (user) => {
  const loginformat = jo.object().keys({
    email: jo.string().email(),
    password: jo.string().min(6).required(),
  }).with('email', 'password');
  return jo.validate(user, loginformat);
};

const pattern = /^[a-zA-Z0-9!@#$%&*]{3,25}$/;
const signupValidator = (user) => {
  const signupFormat = {
    firstName: jo.string().min(3).trim().required(),
    lastName: jo.string().min(3).required(),
    email: jo.string().email().required(),
    password: jo.string().regex(pattern).min(4).required(),
    address: jo.string().min(3),
    status: jo.string().valid('verified', 'unverified'),
    isAdmin: jo.boolean().valid('true', 'false'),
    isLoggedIn: jo.boolean().valid('true', 'false'),
  };
  return jo.validate(user, signupFormat);
};

const verifyUserValidator = (user) => {
  const updateFormat = {
    status: jo.string().valid('verified', 'unverified').required(),
    verifiedBy: jo.string(),

  };
  return jo.validate(user, updateFormat);
};

export default {
  verifyUserValidator,
  signupValidator,
  UserLoginValidator,
};

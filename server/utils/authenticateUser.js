import jo from 'joi';

const UserLoginValidator = (user) => {
  const loginformat = jo.object().keys({
    email: jo.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    password: jo.string().regex(/^[a-zA-Z0-9]{4,8}$/).min(6).required(),
  }).with('email', 'password');
  return jo.validate(user, loginformat);
};

const signupValidator = (user) => {
  const signupFormat = {
    firstName: jo.string().min(3).trim().required()
      .regex(/^[A-Za-z]+$/),
    lastName: jo.string().min(3).required(),
    email: jo.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    password: jo.string().regex(/^[a-zA-Z0-9]{4,8}$/).min(4).required(),
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
    verifiedBy: jo.string().required(),

  };
  return jo.validate(user, updateFormat);
};

export default {
  verifyUserValidator,
  signupValidator,
  UserLoginValidator,
};

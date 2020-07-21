import generateToken from './token';

const userObject = (user) => {
  const object = {
    token: generateToken(user),
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status,
  };
  return object;
};

const verifier = (user) => {
  const data = {
    email: user.email,
    status: user.status,
  };
  return data;
};

export { userObject, verifier };

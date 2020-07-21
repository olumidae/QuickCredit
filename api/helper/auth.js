import jwt from 'jsonwebtoken';
import config from 'dotenv';
import bcrypt from 'bcrypt';

config();

const auth = () => {
  const { secret } = process.env;
  return jwt({ secret });
};

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export default { auth, hashPassword };

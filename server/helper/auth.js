import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const auth = () => {
  const { secret } = process.env;
  return jwt({ secret });
};

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export default { auth, hashPassword };

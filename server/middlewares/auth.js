import webtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const auth = () => {
  const { secret } = process.env;
  return webtoken({ secret });
};

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export default { auth, hashPassword };
import webtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = () => {
  const { secret } = process.env;
  return webtoken({ secret });
};

export default auth;

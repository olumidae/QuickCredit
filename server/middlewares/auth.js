import webtoken from 'jsonwebtoken';
import config from '../config/config.json';


const auth = () => {
  const { secret } = config;
  return webtoken({ secret }).unless({
    path: [
      './server/tests/',
    ],
  });
};

export default auth;

import webtoken from 'jsonwebtoken';
import config from '../config/config.json';

const auth = () => {
  const { secret } = config;
  return webtoken({ secret }).unless({
    path: [
      '../test',
    ],
  });
};

export default auth;

import { fromString } from 'uuidv4';
import { passwordHash } from '../helper/password';

const users = [{
  id: fromString('user'),
  fistName: 'Adamu',
  otherName: 'Chukwuemeka',
  lastName: 'Ciroma',
  email: 'a.ciroma@gmail.com',
  password: passwordHash('password@123'),
  address: '437 Hebert macauley Way Yaba',
  status: 'unverified',
  createdAt: new Date(),
  updatedAt: new Date(),
  isAdmin: true,
  isLoggedIn: false,
}, {
  id: fromString('user2'),
  firstName: 'Tomide',
  otherName: 'Gbenga',
  lastName: 'Adeloye',
  email: 't.adeloye@gmail.com',
  password: passwordHash('password@123'),
  address: '12 Blue Gate street Oluyole Extension',
  status: 'unverified',
  createdAt: new Date(),
  updatedAt: new Date(),
  isAdmin: false,
  isLoggedIn: false,
}];

export { users };

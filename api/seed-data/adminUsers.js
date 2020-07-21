const { fromString } = require('uuidv4');
const { passwordHash } = require('../helper/password');

const adminUsers = [
  {
    id: fromString('admin'),
    firstName: 'Olumide',
    lastName: 'Omitiran',
    email: 'oomitiran@gmail.com',
    password: passwordHash('password@123'),
    address: '41 7up roaad Oluyole Estate',
    status: 'verified',
    createdAt: new Date(),
    updatedAt: new Date(),
    isAdmin: true,
    isLoggedIn: false,
  },
];

module.exports = adminUsers;

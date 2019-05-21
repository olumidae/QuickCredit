import bcrypt from 'bcrypt';
import user from '../dummies/users';

class UserData {
  constructor() {
    this.UserData = [];
  }

  signUp(info) {
    const newUser = {
      id: this.UserData.length + 1,
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      password: bcrypt.hashSync(info.password, 5),
      address: info.address,
      status: 'unverified',
      isAdmin: info.isAdmin,
      isLoggedIn: 'false',
    };
    this.UserData.push(newUser);
    return newUser;
  }
}

export default new UserData();

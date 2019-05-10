import bcrypt from 'bcrypt';

class UserData {
  constructor() {
    this.UserData = [];
  }

  signUp(info) {
    const newUser = {
      id: this.users.length + 1,
      email: info.email,
      firstName: info.firstName,
      lastName: info.lastName,
      password: bcrypt.hashSync(info.password, 5),
      address: info.address,
      status: 'unverified',
      isAdmin: info.isAdmin,
      isLoggedIn: 'false',
    };
    this.users.push(newUser);
    return newUser;
  }
}

export default new UserData();

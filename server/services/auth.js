import db from '../models';
import passwordHelper from '../helper/password';

const { Users } = db;

/**
 * Class representing Auth Service
*/

class AuthService {
  /**
   * Register user after returning payload
  */
  static async signUp(body) {
    const { firstName, lastName, password, address } = body;
    const hashedPassword = passwordHelper.passwordHash(password);
    const response = await Users.create({
      ...body,
      password: hashedPassword,
    });
    return response;
  }


  /**
   * find a user by email address
   * @param {enail} email 
   */
  static async findUserByEmail(email) {
    const response = await Users.findOne({
      where: {
        email
      }
    });
    return response;
  }
}

export default AuthService

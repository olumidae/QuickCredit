import db from '../models';
import { comparePassword, passwordHash } from '../helper/password';

const { Users } = db;

/**
 * @fileoverview Class representing Auth Service
 * @exports AuthService
*/

class AuthService {
  /**
   * Register user after returning payload
  */
  static async signUp(body) {
    const { password } = body;
    const hashedPassword = passwordHash(password);
    const response = await Users.create({
      ...body,
      password: hashedPassword,
    });
    return response;
  }

  /**
   * 
   * @param {*} request body 
  */
  static async login(body) {
    const  { email, password } = body;
    const user = await AuthService.findUserByEmail(email);
    if (user && comparePassword(password, user.dataValues.password)) {
      const loginUser = await user.update({
        isLoggedIn: true,
      })
      return loginUser;
    }
    return { error: 'Invalid credentials'}
  }

  /**
   * find a user by email address
   * @param {email} email 
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

export default AuthService;

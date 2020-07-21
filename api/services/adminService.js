import db from '../models';

const { Users } = db;

/**
 * @fileoverview handles admin functionalities
 * @class AdminService
 * @exports AdminService
*/

class AdminService {
  /**
   * verifes a user
   * @params {user}
   * @returns user
  */
  static async verifyUser({ email }) {
    const response = await Users.update({
      status: 'verified',
    },
    {
      returning: true,
      where: {
        email,
      },
    });
    return response[1][0];
  }
}

export default AdminService;

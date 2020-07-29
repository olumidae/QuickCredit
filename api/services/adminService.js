import db from '../models';

const { Users, Loans } = db;

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

  /**
   * Gets all loan
   * @returns loans
  */
  static async getAllLoans() {
    const loans = await Loans.findAll();
    return loans;
  }
}

export default AdminService;

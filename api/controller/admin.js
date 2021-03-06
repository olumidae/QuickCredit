import ResponseHelper from '../helper/response';
import errors from '../helper/errors';
import { AuthService, AdminService } from '../services';
import { verifier } from '../helper/user';

/**
 * @fileoverview handle Admin functions
 * @class Admin
 * @params {req, res}
 * @exports Admin
*/

class AdminController {
  /**
   * verifies a user
  */

  static async verify(req, res) {
    try {
      const { email } = req.params;
      const user = await AuthService.findUserByEmail(email);
      if (!user) return ResponseHelper.setError(res, 400, errors.notFound);
      const verifyUser = await AdminService.verifyUser(user);
      if (!verifyUser) return ResponseHelper.setError(res, 500, errors.serverError);
      const data = verifier(verifyUser);
      return ResponseHelper.setSuccess(res, 200, data);
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }

  /**
   * Get all loan applications
  */
  static async getAllLoans(req, res) {
    try {
      const allLoans = await AdminService.getAllLoans();
      return ResponseHelper.setSuccess(res, 200, allLoans);
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }

  /**
   * Delete a user
   * @param {*} req
   * @param {*} res
  */
  static async deleteUser(req, res) {
    try {
      const { email } = req.body;
      const user = await AdminService.deleteUser(email);
      return ResponseHelper.setSuccess(res, 200, 'Deleted');
    } catch (error) {
      return ResponseHelper.setSuccess(res, 500, errors.serverError);
    }
  }

  /**
   * Get a specific loan
  */
  static async getSpecificLoan(req, res) {
    try {
      const { loanId } = req.params;
      const loan = await AdminService.getLoanById(loanId);
      if (!loan) return ResponseHelper.setError(res, 404, errors.notFound);
      return ResponseHelper.setSuccess(res, 200, loan);
    } catch (error) {
      return ResponseHelper.setError(res, 500, error);
    }
  }
}


export default AdminController;

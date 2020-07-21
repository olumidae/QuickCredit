import ResponseHelper from '../helper/response';
import errors from '../helper/errors';
import AuthService from '../services/auth';
import AdminService from '../services/adminService';
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
    const { email } = req.params;
    const user = await AuthService.findUserByEmail(email);
    if (!user) return ResponseHelper.setError(res, 400, errors.notFound);
    const verifyUser = await AdminService.verifyUser(user);
    if (!verifyUser) return ResponseHelper.setError(res, 500, errors.serverError);
    const data = verifier(verifyUser);
    return ResponseHelper.setSuccess(res, 200, data);
  }
}

export default AdminController;

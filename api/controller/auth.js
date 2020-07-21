import ResponseHelper from '../helper/response';
import AuthService from '../services/auth';
import userObject from '../helper/user';
import errors from '../helper/errors';

class AuthController {
  static async signUp(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await AuthService.findUserByEmail(email);
      if (existingUser) return ResponseHelper.setError(res, 400, errors.emailExists);
      const authUser = await AuthService.signUp(req.body);
      if (!authUser) return ResponseHelper.setError(res, 500, errors.serverError);
      const data = userObject(authUser);
      return ResponseHelper.setSuccess(res, 201, data);
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }

  static async login(req, res) {
    try {
      const user = await AuthService.login(req.body);
      console.log('USER', user);
      if (!user) return ResponseHelper.setError(res, 400, errors.notFound);
      if (user.error === 'Invalid credentials') return ResponseHelper.setError(res, 403, errors.loginFailure);
      const data = userObject(user);
      return ResponseHelper.setSuccess(res, 200, data);
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }
}

export default AuthController;

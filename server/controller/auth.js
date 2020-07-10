import ResponseHelper from '../helper/response';
import generateToken from '../helper/token';
import AuthService from '../services';
import errors from '../helper/errors';

class AuthController {
  static async signUp(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await AuthService.findUserByEmail(email);
      if (existingUser) return ResponseHelper.setError(res, 409, errors.emailExists);
      const authUser = await AuthService.signUp(req.body);
      if (!authUser) return ResponseHelper.setError(res, 500, errors.serverError);
      const data = AuthController.newUser(authUser);
      return ResponseHelper.setSuccess(res, 201, data);
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }

  static newUser(user) {
    const object = {
      token: generateToken(user),
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return object;
  }
}

export default AuthController;

import ResponseHelper from '../helper/response';
import { AuthService, UserService } from '../services';
import { userObject } from '../helper/user';
import { generateToken, decodedUser } from '../helper/token';
import errors from '../helper/errors';
import sendMail from '../helper/sendEmail';
import { passwordHash } from '../helper/password';

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
      if (!user) return ResponseHelper.setError(res, 400, errors.notFound);
      if (user.error === 'Invalid credentials') return ResponseHelper.setError(res, 403, errors.loginFailure);
      const data = userObject(user);
      return ResponseHelper.setSuccess(res, 200, data);
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }

  static async sendResetLink(req, res, next) {
    try {
      const { email } = req.body;
      const user = await AuthService.findUserByEmail(email);
      if (!user) {
        return ResponseHelper.setError(res, 404, errors.notFound);
      }
      const token = generateToken(user);
      const port = process.env.PORT || 5000;
      const link = `${req.protocol}://${req.hostname}:${port}/api/v1/auth/reset_password/${token}`;

      await sendMail(
        email,
        'olumide.omitiran@xpathedge.com',
        'Password Reset',
        `
        <div>Click the link below to reset your password</div><br/>
        <div>${link}</div>
        `,
      );
      return ResponseHelper.setSuccess(res, 200, 'Password reset link has been sent!');
    } catch (error) {
      return next(new Error(error));
    }
  }

  static async resetPassword(req, res) {
    try {
      const { password } = req.body;
      const { token } = req.params;
      const decoded = decodedUser(token);
      const hashPass = passwordHash(password);
      const updatedUser = await AuthService.resetPassword(hashPass, decoded);
      if (!updatedUser) return ResponseHelper.setError(res, 409, errors.notEdited);
      const { id, firstName, lastName, email } = updatedUser;
      return res.status(200).json({
        status: 'success',
        token,
        id,
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }
}

export default AuthController;

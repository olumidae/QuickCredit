import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import errors from '../helper/errors';
import ResponseHelper from '../helper/response';

config();
const { secret } = process.env;

/**
 * @fileoverview class that authenticates a user and admin
 * @requires jwt
 * @requires config
 * requires ResponseHelpert
*/

class Auth {
  /**
   * verify token by using secret key and publc
   * @param {Object} token
   * @return{Object} verified token
  */

  static verifyToken(token) {
    return jwt.verify(token, secret);
  }

  /**
   * Authenticate users
   * @param {Object} request
   * @param {Object} response
   * @param {callback} next
  */

  static User(request, response, next) {
    try {
      let token = request.headers.authorization;
      if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      request.user = Auth.verifyToken(token);
      return next();
    } catch (error) {
      if (error.message === 'jwt expired') {
        return ResponseHelper.setError(response, 419, errors.sessionExpired);
      }
      return ResponseHelper.setError(response, 401, errors.notAuthenticated);
    }
  }

  /**
   * Authnticate admin
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @return {Object}
  */

  static Admin(request, response, next) {
    try {
      let token = request.headers.authorization;
      if (token && token.startsWith('Bearer')) {
        token = token.slice(7, token.length);
      }
      request.user = Auth.verifyToken(token);
      if (request.user.isAdmin === false) {
        return ResponseHelper.setError(response, 403, errors.notAllowed);
      }
      return next();
    } catch (error) {
      if (error.message === 'jwt expired') {
        return ResponseHelper.setError(response, 419, errors.sessionExpired);
      }
      return ResponseHelper.setError(response, 401, errors.notAuthenticated);
    }
  }
}

export default Auth;


// const tokenValidator = {
//   async validateToken(req, res, next) {
//     const { token } = req.headers;
//     console.log('TOKEN', token);
//     if (token) {
//       jwt.verify(token, secret, async (err, decoded) => {
//         if (err) return res.status(401).json({ status: 'error', error: 'Failed to authenticate token' });

//         const rows = await queryUser(decoded);

//         if (rows[0]) {
//           req.user = rows[0];
//           req.decoded = decoded;
//           return next();
//         }
//         return res.status(401).json({ status: 'error', error: 'Not a valid user' });
//       });
//     } else {
//       return res.status(400).json({ status: 'error', error: 'token not provided' });
//     }
//   },

//   async validateAdminToken(req, res, next) {
//     const { token } = req.headers;
//     if (token) {
//       jwt.verify(token, secret, async (err, decoded) => {
//         if (err) return res.status(401).json({ status: 'error', error: 'Failed to authenticate token' });
//         const rows = await queryUser(decoded);

//         if (rows[0] && rows[0].is_admin) {
//           req.user = rows[0];
//           req.decoded = decoded;
//           return next();
//         }
//         return res.status(403).json({ status: 'error', error: 'Not an admin user' });
//       });
//     } else {
//       return res.status(400).json({ status: 'error', error: 'token not valid' });
//     }
//   },
// };

// export default tokenValidator;

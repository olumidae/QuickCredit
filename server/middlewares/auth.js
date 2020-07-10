import Joi from 'joi';
import Validator from '../helper/validator';
import rules from '../helper/rules';
import errors from '../helper/errors';
import ResponseHelper from '../helper/response';

/**
 * @fileoverview class that functions as middleware to authenticate and authorize user
 * @class Auth
 * @requires Joi@requires ../helper/Validator
 * @requires ResponseHelper ../jelper/responseHelper
 * @exports Auth
*/

class Auth {
  /**
    * validate signup data
    * @param {Object} request
    * @param {Object} response
    * @param {function} next
    * @returns {Object} error
  */

  static authSignUp(request, response, next) {
    const name = Joi.string().min(3).regex(rules.validName).trim().required();
    const email = Joi.string().email().required();
    const password = Joi.string().min(8).regex(rules.passwordLength).required();
    const address = Joi.string().regex(rules.validAddress).required();
    const status = Joi.string().regex(rules.validName).trim();
    const isAdmin = Joi.bool()

    const registerSchema = Joi.object().keys({
      firstName: name.error(new Error(`First Name ${errors.validName}`)),
      lastName: name.error(new Error(`Last Name ${errors.validName}`)),
      email,
      password,
      status,
      address: address.error(new Error('Address is required')),
      isAdmin,
    });
    const error = Validator.validateJoi(request.body, registerSchema);

    if (!error) {
      return next();
    }
    return ResponseHelper.setError(response, 400, error);
  }
}

export default Auth;

import Joi from 'joi';
import Validator from '../helper/validator';
import rules from '../helper/rules';
import errors from '../helper/errors';
import ResponseHelper from '../helper/response';

/**
 * @fileoverview class that functions as middleware to authenticate and authorize user
 * @class Validate
 * @requires Joi@requires ../helper/Validator
 * @requires ResponseHelper ../jelper/responseHelper
 * @exports Validate
*/

class Validate {
  /**
   * validate signup data
   * @param {Object} request
   * @param {Object} response
   * @param {function} next
   * @returns {Object} error
  */

  static userSignUp(request, response, next) {
    const name = Joi.string().min(3).regex(rules.validName).trim().required();
    const email = Joi.string().email().required();
    const password = Joi.string().min(8).regex(rules.passwordLength).required();
    const address = Joi.string().regex(rules.validAddress).required();

    const registerSchema = Joi.object().keys({
      firstName: name.error(new Error(`First Name ${errors.validName}`)),
      lastName: name.error(new Error(`Last Name ${errors.validName}`)),
      email,
      password,
      address: address.error(new Error('Address is required')),
    });
    const error = Validator.validateJoi(request.body, registerSchema);

    if (!error) {
      return next();
    }
    return ResponseHelper.setError(response, 400, error);
  }

  /**
   * validate login data
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
  */
  static login(request, response, next) {
    const email = Joi.string().email().lowercase().required();
    const password = Joi.string().regex(rules.passwordLength).required();

    const loginSchema = Joi.object().keys({
      email,
      password: password.error(new Error('Password does not meet the required pattern')),
    }).with('email', 'password');

    const error = Validator.validateJoi(request.body, loginSchema);
    if (!error) {
      return next();
    }
    return ResponseHelper.setError(response, 400, error);
  }

  static delete(request, response, next) {
    const email = Joi.string().email().lowercase().required();

    const loginSchema = Joi.object().keys({
      email,
    });

    const error = Validator.validateJoi(request.body, loginSchema);
    if (!error) {
      return next();
    }
    return ResponseHelper.setError(response, 400, error);
  }
}

export default Validate;

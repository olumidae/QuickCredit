import Joi from 'joi';
import Validator from '../helper/validator';
import rules from '../helper/rules';
import ResponseHelper from '../helper/response';

/**
 * @fileoverview validates loan request data
 * @requires joi
 * @requires Validator
 * @exports ValidateLoan
*/

class ValidateLoan {
  static validate(request, response, next) {
    const amount = Joi.string().regex(rules.digits).trim().required();
    const tenor = Joi.string().valid(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']).trim().required();

    const loanSchema = Joi.object().keys({
      amount: amount.error(new Error('Amount is required. You must enter only numbers')),
      tenor: tenor.error(new Error('Tenor most be between 1-12 months')),
    });

    const error = Validator.validateJoi(request.body, loanSchema);
    if (!error) return next();
    return ResponseHelper.setError(response, 400, error);
  }
}

export default ValidateLoan;

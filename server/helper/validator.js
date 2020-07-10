import Joi from 'joi';

/**
 * @fileoverview class to hold validator method
 * @class Validator
 * @exports Validator 
*/

class Validator {
  /**
   * Validate data by checking with a predefined Joi schema
   * @param {Object} data
   * @param {Object} schema
   * @param {Object} response
   * @param {Function} next
   * @returns {Object} error
  */

  static validateJoi(data, schema) {
    let error;
    const validationOptions = {
      allowUnknown: true, // allow unknown key that'll be ignored
      stripUnknown: true, // allow unknown keys from unknown keys from the vaalidation data
    };

    Joi.validate(data, schema, validationOptions, (err) => {
      if (err) {
        error = err.details ? err.details[0].message.replace(/['"]/g, '') : err.message;
      }
    });
    return error;
  }
}

export default Validator;

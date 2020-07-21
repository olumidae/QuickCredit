/**
 * @fileoverview - class to hold response messages
 * @class ResponseHelper
 * @exports ResponseHelper
*/

class ResponseHelper {
  /**
   * success: prepre json response for response for API endpoint
   * @param {object} res response object
   * @param {Number} statusCode success status code on the response
   * @param {object} data Object data of a success code
   * @returns {object} json response object
  */

  static setSuccess(res, statusCode, data) {
    return res.status(statusCode).json({
      status: 'success',
      data,
    });
  }

  /**
   * error: prepre json response for response for API endpoint
   * @param {object} res response object
   * @param {Number} statusCode error status code on the response
   * @param {object} error Object data of a error code
   * @returns {object} json response object
  */

  static setError(res, statusCode, error) {
    return res.status(statusCode).json({
      status: 'error',
      error,
    });
  }
}

export default ResponseHelper;

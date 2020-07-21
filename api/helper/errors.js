/**
 * @fileoverview - contains a list of error messages in response to bad requests to the server
 * @exports errors
*/

const errors = {
  serverError: 'Damn! Looks like something broke',
  badRequest: 'Error! Bad Request',
  validName: 'field cannot be empty and must contain only letters',
  validNumber: 'field cannot be empty and must contain only numbers',
  invalidPage: 'Oops! Page not found. Looks like your url is invalid',
  emailExists: 'Email address has already been registered',
  loginFailure: 'Could not log in. Email and passwords do not match',
  notAllowed: 'You are forbidden from accessing this section of the app',
  sessionExpired: 'Session expired, login again',
  notAuthenticated: 'You must login to have access to this feature',
  notCreated: 'Could not successfully create data',
  notEdited: 'Cannot edit data',
  notFound: 'notFound',
  passwordMismatch: 'Password Mismatch',
  alreadyExists: 'Record already exists',
  loginExceeded: 'you have exceeded the required login attempts. Reset your password',
};

export default errors;

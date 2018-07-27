import validator from 'validator';
import signupUsernameValidator from './usernameValidator';
import undefinedInputFieldCheck from './undefinedInput';

const signupEmailValidator = (req) => {
  const errors = signupUsernameValidator(req);
  // trim email and convert to lowercase before storing in database

  undefinedInputFieldCheck(req.body, 'email');
  const { email } = req.body;

  if (validator.isEmpty(email)) {
    errors.email = 'Email field must not be empty';
  } else if (!validator.isEmail(email)) {
    errors.email = 'The email you entered is invalid';
  }
  return errors;
};


export default signupEmailValidator;

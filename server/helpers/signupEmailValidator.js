import validator from 'validator';
import signupUsernameValidator from './signupUsernameValidator';
import undefinedInputFieldCheck from './signupUndefinedInput';

const signupEmailValidator = (req) => {
  const errors = signupUsernameValidator(req);

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

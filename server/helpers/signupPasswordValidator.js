import validator from 'validator';
import signupEmailValidator from './signupEmailValidator';
import undefinedInputFieldCheck from './signupUndefinedInput';

const signupPasswordValidator = (req) => {
  const errors = signupEmailValidator(req);

  undefinedInputFieldCheck(req.body, 'password');

  const { password } = req.body;

  if (validator.isEmpty(password)) {
    errors.password = 'Password field must not be empty';
  }
  if (password && !validator.isLength(password, { min: 8, max: 20 })) {
    errors.password = 'Password must have a minimum length of 8 characters and \n'
    + 'a maximum length of 20 characters';
  }
  return errors;
};


export default signupPasswordValidator;

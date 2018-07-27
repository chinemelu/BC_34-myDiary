import validator from 'validator';
import signupEmailValidator from './emailValidator';
import undefinedInputFieldCheck from './undefinedInput';

const signupPasswordValidator = (req) => {
  const errors = signupEmailValidator(req);
  // trim password before storing it in database


  // check for undefined input values
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

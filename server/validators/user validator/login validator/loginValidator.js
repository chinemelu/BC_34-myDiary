import validator from 'validator';
import undefinedInput from './undefinedInput';

const loginValidator = (data) => {
  const errors = {};
  // sanitise username and password input
  // check for undefined input values

  undefinedInput(data, 'email'); // function for checking if email is undefined
  undefinedInput(data, 'password'); // function for checking if password is undefined

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export default loginValidator;

import validator from 'validator';
import undefinedInput from './diaryUndefinedInput';

const loginValidator = (data) => {
  const errors = {};

  undefinedInput(data, 'email');
  undefinedInput(data, 'password');

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

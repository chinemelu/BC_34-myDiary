import validator from 'validator';
import undefinedInputFieldCheck from './signupUndefinedInput';

const signupUsernameValidator = (req) => {
  const errors = {};
  undefinedInputFieldCheck(req.body, 'username');

  const { username } = req.body;

  if (validator.isEmpty(username)) {
    errors.username = 'Username field must not be empty';
  } else if (!validator.matches(username, /^[A-Za-z0-9]*$/)) {
    errors.username = 'Username should consist of only alphanumeric \n'
    + 'characters and must contain no spaces between characters';
  } else if (!validator.isLength(username, { min: 4, max: 15 })) {
    errors.username = 'Username must have a minimum length of 4 characters and a maximum \n'
      + 'length of 15 characters';
  }
  return errors;
};


export default signupUsernameValidator;

import validator from 'validator';
import isPrivacyFieldEmpty from '../middlewares/isPrivacyEmpty';

export const inputFieldCheck = (data, isEditing, diaryEntry, inputField) => {
  if (isEditing === false && data[inputField] === undefined) {
    data[inputField] = '';
    return data[inputField];
  }
  if (isEditing === false && data[inputField]) {
    data[inputField] = data[inputField].trim();
    return data[inputField];
  }
  if (isEditing === true && data[inputField] === undefined) {
    data[inputField] = diaryEntry[inputField];
    return data[inputField];
  }
  if (isEditing === true && data[inputField]) {
    data[inputField] = data[inputField].trim();
    return data[inputField];
  }
};

export const undefinedInputFieldCheck = (data, inputField) => {
  if (data[inputField] === undefined) {
    data[inputField] = '';
    return data[inputField];
  }
  data[inputField] = data[inputField].trim().toLowerCase();
};


export const validIdValidator = (data) => {
  const errors = {};
  if (!validator.isUUID(data.id)) {
    errors.id = 'Invalid Id';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};


export const signupUsernameValidator = (req) => {
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


export const signupEmailValidator = (req) => {
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

export const signupPasswordValidator = (req) => {
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

export const signupValidator = (req, res, next) => {
  const errors = signupPasswordValidator(req);

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      errors
    });
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  }
  next();
};

export const postDiaryEntryTitleValidator = (data, isEditing, diaryEntry) => {
  const errors = {};
  inputFieldCheck(data, isEditing, diaryEntry, 'title');

  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  } else if (data.title && !validator.isLength(data.title, { min: 4, max: 70 })) {
    errors.title = 'Title must have a minimum length of 4 characters and a maximum \n'
  + 'length of 70 characters';
  } else if (!validator.matches(data.title, /^[A-Za-z0-9 ]*$/)) {
    errors.title = 'Title should consist of only alphanumeric characters';
  }
  return errors;
};

export const postDiaryEntryDescriptionValidator = (data, isEditing, diaryEntry) => {
  const errors = postDiaryEntryTitleValidator(data, isEditing, diaryEntry);
  inputFieldCheck(data, isEditing, diaryEntry, 'description');

  if (validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  } else if (data.description && !validator.matches(data.description, /^(?=.*[ a-zA-Z])([ a-zA-Z0-9,.?-]+)*$/)) {
    errors.description = 'Description must consist of alphanumeric \n'
    + 'characters and special characters (? - , . ), and it must include at \n'
    + 'least one alphabet';
  } else if (!validator.isLength(data.description, { min: 4 })) {
    errors.description = 'Description must have a minimum length of 4 characters';
  }
  return errors;
};

export const postDiaryEntryPrivacyValidator = (data, isEditing, diaryEntry) => {
  const errors = postDiaryEntryDescriptionValidator(data, isEditing, diaryEntry);

  inputFieldCheck(data, isEditing, diaryEntry, 'privacy');

  if (!validator.isEmpty(data.privacy) && (!validator.equals(data.privacy, 'private', 'public')
      && !validator.equals(data.privacy, 'public'))) {
    errors.privacy = 'Please enter private or public';
  }
  return errors;
};

export const postDiaryEntryValidator = (data, isEditing, diaryEntry) => {
  const errors = postDiaryEntryPrivacyValidator(data, isEditing, diaryEntry);

  if (isEditing === true && isPrivacyFieldEmpty(data) === diaryEntry.privacy
      && data.title === diaryEntry.title
      && data.description === diaryEntry.description) {
    errors.inputField = 'Please change the value of at least one input field';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};


export const loginValidator = (data) => {
  const errors = {};

  undefinedInputFieldCheck(data, 'email');
  undefinedInputFieldCheck(data, 'password');

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

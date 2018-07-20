import validator from 'validator';
import postDiaryEntryTitleValidator from './titleValidator';

const postDiaryEntryDescriptionValidator = (data) => {
  // Sanitise the description field to prevent empty spaces counting as characters
  const errors = postDiaryEntryTitleValidator(data);
  data.description = data.description.trim();

  // Validate the description field
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

export default postDiaryEntryDescriptionValidator;

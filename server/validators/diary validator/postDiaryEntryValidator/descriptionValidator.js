import validator from 'validator';
import postDiaryEntryTitleValidator from './titleValidator';
import inputFieldCheck from './inputFieldCheck';

const postDiaryEntryDescriptionValidator = (data, isEditing, diaryEntry) => {
  // Sanitise the description field to prevent empty spaces counting as characters
  // diary entry will be obtained from db using its Id before PUT route modification
  // PUT and POST API routes share same validator
  const errors = postDiaryEntryTitleValidator(data, isEditing, diaryEntry);
  // use input field check option to check for undefined values of POST and PUT routes
  inputFieldCheck(data, isEditing, diaryEntry, 'description');

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

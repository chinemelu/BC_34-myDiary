import validator from 'validator';
import postDiaryEntryTitleValidator from './diaryTitleValidator';
import inputFieldCheck from './inputFieldCheck';

const postDiaryEntryDescriptionValidator = (data, isEditing, diaryEntry) => {
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

export default postDiaryEntryDescriptionValidator;

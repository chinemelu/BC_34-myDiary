import validator from 'validator';
import inputFieldCheck from './inputFieldCheck';

const postDiaryEntryTitleValidator = (data, isEditing, diaryEntry) => {
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
export default postDiaryEntryTitleValidator;

import validator from 'validator';
import postDiaryDescriptionValidator from './diaryDescriptionValidator';
import inputFieldCheck from './inputFieldCheck';

const postDiaryEntryPrivacyValidator = (data, isEditing, diaryEntry) => {
  const errors = postDiaryDescriptionValidator(data, isEditing, diaryEntry);

  inputFieldCheck(data, isEditing, diaryEntry, 'privacy');

  if (!validator.isEmpty(data.privacy) && (!validator.equals(data.privacy, 'private', 'public')
      && !validator.equals(data.privacy, 'public'))) {
    errors.privacy = 'Please enter private or public';
  }
  return errors;
};

export default postDiaryEntryPrivacyValidator;

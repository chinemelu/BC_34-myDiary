import validator from 'validator';
import postDiaryDescriptionValidator from './descriptionValidator';

const postDiaryEntryPrivacyValidator = (data, isEditing, diaryEntry) => {
  // Sanitise the privacy field to prevent empty spaces counting as characters
  const errors = postDiaryDescriptionValidator(data, isEditing, diaryEntry);
  if (isEditing === false && data.privacy === undefined) { // validate for undefined input value
    data.privacy = '';
  } else if (isEditing === false && data.privacy) { // if isEditing is false, POST end point is on
    data.privacy = data.privacy.trim();
  } else if (isEditing === true && data.privacy) { // if isEditing is true, PUT end point is on
    data.privacy = data.privacy.trim();
    // Both PUT and POST share the same validator
  } else if (isEditing === true && data.privacy === undefined) {
    data.privacy = diaryEntry.privacy;
  }
  // Validate the privacy field
  if (!validator.isEmpty(data.privacy) && (!validator.equals(data.privacy, 'private', 'public')
      && !validator.equals(data.privacy, 'public'))) {
    errors.privacy = 'Please enter private or public';
  }
  return errors;
};

export default postDiaryEntryPrivacyValidator;

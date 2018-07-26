import validator from 'validator';
import postDiaryDescriptionValidator from './descriptionValidator';
import inputFieldCheck from './inputFieldCheck';

const postDiaryEntryPrivacyValidator = (data, isEditing, diaryEntry) => {
  // Sanitise the privacy field to prevent empty spaces counting as characters
  // diary entry will be obtained from db using its Id before PUT route modification
  // PUT and POST API routes share same validator
  const errors = postDiaryDescriptionValidator(data, isEditing, diaryEntry);

  // use input field check option to check for undefined values of POST and PUT routes
  inputFieldCheck(data, isEditing, diaryEntry, 'privacy');

  // Validate the privacy field
  if (!validator.isEmpty(data.privacy) && (!validator.equals(data.privacy, 'private', 'public')
      && !validator.equals(data.privacy, 'public'))) {
    errors.privacy = 'Please enter private or public';
  }
  return errors;
};

export default postDiaryEntryPrivacyValidator;

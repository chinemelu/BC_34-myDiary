import postDiaryEntryPrivacyValidator from './privacyValidator';
import isPrivacyFieldEmpty from '../../../controllers/diary controller/addDiaryEntryController/isPrivacyEmpty';

const postDiaryEntryValidator = (data, isEditing, diaryEntry) => {
  const errors = postDiaryEntryPrivacyValidator(data, isEditing, diaryEntry);

  // A check that determines if at least one input field is selected during the PUT route
  // This check prevents the database from being queried unnecessarily
  /** isPrivacyFieldEmpty function returns "private" or public depending on if privacy field
  is left blank or not */
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


export default postDiaryEntryValidator;

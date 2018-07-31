import postDiaryEntryPrivacyValidator from './diaryPrivacyValidator';
import isPrivacyFieldEmpty from '../middlewares/isPrivacyEmpty';

const postDiaryEntryValidator = (data, isEditing, diaryEntry) => {
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


export default postDiaryEntryValidator;

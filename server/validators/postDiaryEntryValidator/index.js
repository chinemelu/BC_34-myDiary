import postDiaryEntryPrivacyValidator from './privacyValidator';

const postDiaryEntryValidator = (data, isEditing, diaryEntry) => {
  const errors = postDiaryEntryPrivacyValidator(data, isEditing, diaryEntry);
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};


export default postDiaryEntryValidator;

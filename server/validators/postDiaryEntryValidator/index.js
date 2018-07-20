import postDiaryEntryPrivacyValidator from './privacyValidator';

const postDiaryEntryValidator = (data) => {
  const errors = postDiaryEntryPrivacyValidator(data);

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};


export default postDiaryEntryValidator;

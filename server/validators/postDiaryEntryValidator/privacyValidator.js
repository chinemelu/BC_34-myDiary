import validator from 'validator';
import postDiaryDescrptionValidator from './descriptionValidator';

const postDiaryEntryPrivacyValidator = (data) => {
  // Sanitise the privacy field to prevent empty spaces counting as characters
  const errors = postDiaryDescrptionValidator(data);
  if (data.privacy === undefined) return JSON.stringify(data.privacy);
  data.privacy = data.privacy.trim();

  // Validate the privacy field
  if (!validator.isEmpty(data.privacy) && (!validator.equals(data.privacy, 'private', 'public')
      && !validator.equals(data.privacy, 'public'))) {
    errors.privacy = 'Please enter private or public';
  }
  return errors;
};

export default postDiaryEntryPrivacyValidator;

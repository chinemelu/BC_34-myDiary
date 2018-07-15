import validator from 'validator';

const postDiaryEntryValidator = (data) => {
  const errors = {};

  // Sanitise the data to prevent empty spaces counting as characters
  data.title = data.title.trim();
  data.description = data.description.trim();

  // Validate the title and description data

  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  } else if (!validator.isLength(data.title, { min: 4, max: 70 })) {
    errors.title = 'Title must have a minimum length of 4 characters and a maximum \n'
      + 'length of 70 characters';
  } else if (!validator.matches(data.title, /^[A-Za-z0-9 ]*$/)) {
    errors.title = 'Title should consist of only alphanumeric characters';
  }
  if (validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  } else if (!validator.matches(data.description, /^(?=.*[ a-zA-Z])([ a-zA-Z0-9,.?-]+)*$/)) {
    errors.description = 'Description must consist of alphanumeric \n'
        + 'characters and special characters (? - , . ), and it must include at \n'
        + 'least one alphabet';
  } else if (!validator.isLength(data.description, { min: 4 })) {
    errors.description = 'Description must have a minimum length of 4 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export default postDiaryEntryValidator;

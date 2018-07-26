import validator from 'validator';

const validIdValidator = (data) => {
  const errors = {};
  if (!validator.isUUID(data.id)) { // check if the id is a UUID
    errors.id = 'Invalid Id';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export default validIdValidator;

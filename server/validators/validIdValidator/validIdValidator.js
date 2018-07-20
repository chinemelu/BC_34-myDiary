import validator from 'validator';

const validIdValidator = (data) => {
  const errors = {};
  if (!validator.isInt(data.id)) {
    errors.id = 'Invalid Id';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export default validIdValidator;

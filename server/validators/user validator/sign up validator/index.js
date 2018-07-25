import signupPasswordValidator from './passwordValidator';

const signupValidator = (req, res, next) => {
  const errors = signupPasswordValidator(req);

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      errors
    });
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  }
  next();
};


export default signupValidator;

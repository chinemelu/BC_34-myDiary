import express from 'express';
import userSignupController from '../controllers/userController/signup';
import userLoginController from '../controllers/userController/login';
import signupValidator from '../helpers/signupIndexValidator';

const router = express.Router();

router.post('/signup', signupValidator, userSignupController.signup);
router.post('/login', userLoginController.login);

export default router;

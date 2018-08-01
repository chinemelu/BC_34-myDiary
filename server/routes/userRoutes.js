import express from 'express';
import userSignupController from '../controllers/userController/SignupController';
import userLoginController from '../controllers/userController/LoginController';
import { signupValidator } from '../helpers/helper';

const router = express.Router();

router.post('/signup', signupValidator, userSignupController.signup);
router.post('/login', userLoginController.login);

export default router;

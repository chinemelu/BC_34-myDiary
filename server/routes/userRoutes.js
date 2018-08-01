import express from 'express';
import userSignupController from '../controllers/userController/Signup';
import userLoginController from '../controllers/userController/Login';
import { signupValidator } from '../helpers/helper';

const router = express.Router();

router.post('/signup', signupValidator, userSignupController.signup);
router.post('/login', userLoginController.login);

export default router;

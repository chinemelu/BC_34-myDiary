import express from 'express';
import userSignupController from '../controllers/user controller/user signup/signup';
import userLoginController from '../controllers/user controller/user login/login';
import signupValidator from '../validators/user validator/sign up validator/index';


const router = express.Router();

router.post('/signup', signupValidator, userSignupController.signup);
router.post('/login', userLoginController.login);

export default router;

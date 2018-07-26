import express from 'express';
import userSignupController from '../controllers/user controller/user signup/signup';
import signupValidator from '../validators/user validator/sign up validator/index';


const router = express.Router();

router.post('/signup', signupValidator, userSignupController.signup);

export default router;

import loginValidator from '../../helpers/loginValidator';
import getUserByEmail from './getUserByEmail';
import verifyUserPassword from './verifyUserPassword';
import loginResponse from './loginResponse';

/**
 * @class userController
 */
class userController {
  /**
   * @description user sign in
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} Returns a JSON object
  */
  static login(req, res) {
    const { errors, isValid } = loginValidator(req.body);
    if (isValid) {
      getUserByEmail(req.body.email, res, (user) => {
        if (!user) {
          res.status(401).json({ error: 'email or password is incorrect' });
        } else {
          verifyUserPassword(req.body.password, user.password, (isMatch) => {
            if (isMatch) {
              loginResponse(res, user);
            } else {
              res.status(401).json({ error: 'email or password is incorrect' });
            }
          });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  }
}

export default userController;

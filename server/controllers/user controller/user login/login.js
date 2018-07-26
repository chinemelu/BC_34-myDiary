import loginValidator from '../../../validators/user validator/login validator/loginValidator';
import getUserByEmail from './getUserByEmail';
import verifyUserPassword from './verifyUserPassword';
import successDatabaseResponse from './successDatabaseResponse';

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
    const { errors, isValid } = loginValidator(req.body); // validate login input
    if (isValid) { // if login input is valid
      getUserByEmail(req.body.email, res, (user) => {
        if (!user) { // if user doesn't exist, send authentication error
          res.status(401).json({ error: 'email or password is incorrect' });
        } else { // if user exists, verify that password in db is same as password in form body
          verifyUserPassword(req.body.password, user.password, (isMatch) => {
            if (isMatch) { // if password matches, add userId to token payload
              successDatabaseResponse(res, user); // success database response
            } else { // if password input doesn't match password in database, respond with error msg
              res.status(401).json({ error: 'email or password is incorrect' });
            }
          });
        }
      });
    } else { // If there's a validation error, send error response
      res.status(400).json({ errors });
    }
  }
}

export default userController;

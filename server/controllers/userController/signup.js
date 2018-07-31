import signupUserDatabaseCall from './signupQuery';
import db from '../../models/db';
/**
 * @class userController
 */
class userController {
  /**
   * @description user sign up
   * @param {*} req Http request
   * @param {*} res Http response
   * @returns  {JSON} Returns a JSON object
   */
  static signup(req, res) {
    const {
      email,
      username
    } = req.body;
    const errors = {};

    const text = 'SELECT * FROM users WHERE email =$1 OR username = $2 LIMIT 1';
    const params = [email, username];

    db(text, params, (error, user) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (!user.rows.length) {
        signupUserDatabaseCall(res, req);
      } else {
        if (user.rows[0].username === req.body.username) {
          errors.usernameExists = 'username exists';
        } if (user.rows[0].email === req.body.email) {
          errors.emailExists = 'email exists';
        }
        return res.status(409).json({ errors });
      }
    });
  }
}

export default userController;

import signupUserDatabaseCall from './databaseCall';
import pool from '../../../models/db';
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
    // check if user already exists
    const {
      email,
      username
    } = req.body;
    const errors = {};
    pool.query('SELECT * FROM users WHERE email =$1 OR username = $2 LIMIT 1', [email, username], (err, user) => {
      if (err) {
        throw err;
      }
      // if there are no existing users with the email or password, call signup function
      if (!user.rows.length) {
        signupUserDatabaseCall(res, req);
      } else { // if existing username or email in the database, send a conflict error msg
        if (user.rows[0].username === req.body.username) {
          errors.usernameExists = 'username exists';
        } if (user.rows[0].email === req.body.email) {
          errors.emailExists = 'email exists';
        } if (errors) {
          return res.status(409).json({ errors });
        }
      }
    });
  }
}

export default userController;

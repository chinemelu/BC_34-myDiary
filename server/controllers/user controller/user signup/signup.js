import { Pool } from 'pg';
import signupUserDatabaseCall from './databaseCall';
import dbDetails from '../../../models/db';
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

    const pool = new Pool(dbDetails);
    pool.query('SELECT * FROM users WHERE email =$1 OR username = $2 LIMIT 1', [email, username], (error, user) => {
      if (error) {
        return res.status(500).json({ error });
      }
      // if there are no existing users with the email or password, call signup function
      if (!user.rows.length) {
        signupUserDatabaseCall(res, req);
      } else { // if existing username or email in the database, send a conflict error msg
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

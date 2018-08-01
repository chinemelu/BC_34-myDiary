import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    const selectText = 'SELECT * FROM users WHERE email =$1 OR username = $2 LIMIT 1';
    const selectParams = [email, username];

    db(selectText, selectParams, (error, user) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (!user.rows.length) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const insertText = 'INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING \n'
        + 'id, username, email';
        const insertParams = [req.body.username, req.body.email, hashedPassword];
        db(insertText, insertParams, (err, newUser) => {
          if (err) {
            return res.status(500).json({ error: err.stack });
          }
          const payload = {
            userId: newUser.rows[0].id,
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '2h'
          });
          res.status(201).json({
            message: `${newUser.rows[0].username}, you have successfully created an account`,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email,
            token
          });
        });
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

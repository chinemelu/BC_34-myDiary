import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginValidator } from '../../helpers/helper';
import db from '../../models/db';

/**
 * @class userController
 */
class UserController {
  /**
   * @description user sign in
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} Returns a JSON object
  */
  static login(req, res) {
    const { errors, isValid } = loginValidator(req.body);
    if (isValid) {
      const text = 'SELECT * FROM users WHERE email = $1';
      const params = [req.body.email];
      db(text, params, (err, user) => {
        if (err) {
          return res.status(500).json({ error: err.stack });
        }
        if (!user.rows.length) {
          res.status(401).json({ error: 'email or password is incorrect' });
        } else {
          bcrypt.compare(req.body.password, user.rows[0].password)
            .then((isMatch) => {
              if (isMatch) {
                const payload = {
                  userId: user.rows[0].id,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: '2h'
                });
                res.status(200).json({
                  message: `${user.rows[0].username}, you have successfully logged in`,
                  email: user.rows[0].email,
                  token
                });
              } else {
                return res.status(401).json({ error: 'email or password is incorrect' });
              }
            })
            .catch((error) => {
              res.status(500).json({
                error
              });
            });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  }
}

export default UserController;

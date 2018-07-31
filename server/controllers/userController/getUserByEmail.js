import db from '../../models/db';

const getUserByEmail = (email, res, callback) => {
  const text = 'SELECT * FROM users WHERE email = $1';
  const params = [email];
  db(text, params, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.stack });
    }
    callback(user.rows[0]);
  });
};

export default getUserByEmail;

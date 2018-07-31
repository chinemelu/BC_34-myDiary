import db from '../models/db';

const doesUserExist = (res, userId, callback) => {
  const text = 'SELECT * FROM users WHERE id = $1';
  const params = [userId];

  db(text, params, (err, results) => {
    if (results.rows.length) {
      callback(results.rows[0].id);
    } else {
      res.status(401).json({
        message: 'User does not exist'
      });
    }
  });
};

export default doesUserExist;

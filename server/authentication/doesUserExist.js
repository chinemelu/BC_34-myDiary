import pool from '../models/db';

const doesUserExist = (res, userId, callback) => {
  pool.connect()
    .then(client => client.query('SELECT * FROM users WHERE id = $1', [userId])
      .then((results) => {
        // check if there's a result
        if (results.rows.length) {
          callback(results.rows[0].id);
        } else {
          res.status(401).json({
            message: 'User does not exist'
          });
        }
      }));
};

export default doesUserExist;

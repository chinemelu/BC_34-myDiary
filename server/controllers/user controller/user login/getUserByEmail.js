import pool from '../../../models/db';

const getUserByEmail = (email, res, callback) => {
  pool.connect() // connect to database
    .then(client => client.query('SELECT * FROM users WHERE email = $1', [email])
      .then((user) => {
        callback(user.rows[0]);
        client.release();
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
        client.release();
      }));
};

export default getUserByEmail;

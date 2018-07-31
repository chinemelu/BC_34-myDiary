import { Pool } from 'pg';
import dbDetails from '../../../models/db';

const pool = new Pool(dbDetails);

const getUserByEmail = (email, res, callback) => {
  pool.query('SELECT * FROM users WHERE email = $1', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.stack });
    }
    callback(user.rows[0]);
  });
};

export default getUserByEmail;

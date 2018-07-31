import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dbDetails from '../../../models/db';
import successDatabaseResponse from './successDatabaseResponse';

const signupUserDatabaseCall = (res, req) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  // use function to hash password before saving into db
  const pool = new Pool(dbDetails);
  pool.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING \n'
    + 'id, username, email',
  [req.body.username, req.body.email, hashedPassword], (err, newUser) => {
    if (err) {
      return res.status(500).json({ error: err.stack });
    }
    const payload = {
      userId: newUser.rows[0].id, // add userId to jwt token
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { // encode jwt token
      expiresIn: '2h'
    });
    successDatabaseResponse(res, newUser, token); // database response
  });
};

export default signupUserDatabaseCall;

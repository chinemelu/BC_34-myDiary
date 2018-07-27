import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../../models/db';
import databaseResponse from './successDatabaseResponse';

const loginUserDatabaseCall = (res, req) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  // use function to hash password before saving into db

  pool.connect() // connect to database
    .then(client => client.query('SELECT * FROM users(username, email, password) VALUES ($1, $2, $3) RETURNING \n'
    + 'email',
    [req.body.username, req.body.email, hashedPassword])
      .then((newUser) => {
        const payload = {
          userId: newUser.rows[0].id, // add userId to jwt token
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { // encode jwt token
          expiresIn: '2h'
        });
        databaseResponse(res, newUser, token); // database response
        client.release();
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
        client.release();
      }));
};

export default loginUserDatabaseCall;

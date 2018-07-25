import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../../models/db';
import successDatabaseResponse from './successDatabaseResponse';

const signupUserDatabaseCall = (res, req) => {
  const {
    username,
    email
  } = req.body;

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  // use function to hash password before saving into db

  pool.connect() // connect to database
    .then(client => client.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING \n'
    + 'id, username, email',
    [username, email, hashedPassword])
      .then((newUser) => {
        const payload = {
          userId: newUser.id, // add userId to jwt token
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { // encode jwt token
          expiresIn: '2h'
        });
        successDatabaseResponse(res, newUser, token); // database response
        client.release();
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
        client.release();
      }));
};

export default signupUserDatabaseCall;

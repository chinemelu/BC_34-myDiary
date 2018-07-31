import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../models/db';
import signupResponse from './signupResponse';

const signupUserDatabaseCall = (res, req) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const text = 'INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING \n'
  + 'id, username, email';
  const params = [req.body.username, req.body.email, hashedPassword];
  db(text, params, (err, newUser) => {
    if (err) {
      return res.status(500).json({ error: err.stack });
    }
    const payload = {
      userId: newUser.rows[0].id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '2h'
    });
    signupResponse(res, newUser, token);
  });
};

export default signupUserDatabaseCall;

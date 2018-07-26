import jwt from 'jsonwebtoken';

const successDatabaseResponse = (res, user) => {
  const payload = {
    userId: user.id, // add userId to jwt token
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { // encode jwt token
    expiresIn: '2h'
  });

  res.status(200).json({
    message: `${user.username}, you have successfully logged in`,
    email: user.email,
    token
  });
};

export default successDatabaseResponse;

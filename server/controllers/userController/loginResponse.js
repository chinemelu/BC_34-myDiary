import jwt from 'jsonwebtoken';

const loginResponse = (res, user) => {
  const payload = {
    userId: user.id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '2h'
  });

  res.status(200).json({
    message: `${user.username}, you have successfully logged in`,
    email: user.email,
    token
  });
};

export default loginResponse;

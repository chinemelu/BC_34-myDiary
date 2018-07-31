
const signupResponse = (res, newUser, token) => {
  res.status(201).json({
    message: `${newUser.rows[0].username}, you have successfully created an account`,
    username: newUser.rows[0].username,
    email: newUser.rows[0].email,
    token
  });
};

export default signupResponse;

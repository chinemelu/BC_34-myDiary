import bcrypt from 'bcrypt';

const verifyPassword = (password, hash, callback) => {
  bcrypt.compare(password, hash)
    .then((isMatch) => {
      callback(isMatch);
    })
    .catch((err) => {
      throw err;
    });
};

export default verifyPassword;

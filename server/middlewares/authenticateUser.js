const authenticateUser = (userId, diaryEntry, res, callback) => {
  if (userId !== diaryEntry.userid) {
    res.status(403).json({
      error: 'You are not authorised to perform this action'
    });
  } else {
    callback();
  }
};

export default authenticateUser;

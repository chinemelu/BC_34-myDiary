const authenticateUser = (userId, diaryEntry, res, callback) => {
  if (userId !== diaryEntry.userid) { // if user in diary Entry table is same as user making request
    res.status(403).json({
      error: 'You are not authorised to perform this action'
    });
  } else {
    callback();
  }
};

export default authenticateUser;

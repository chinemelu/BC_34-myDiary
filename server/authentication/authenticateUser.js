const authenticateUser = (userId, diaryEntry, res) => {
  const fetchedDiaryEntry = { // create a new object to exclude userId from response
    id: diaryEntry.id,
    title: diaryEntry.title,
    description: diaryEntry.description,
    privacy: diaryEntry.privacy,
    created_at: diaryEntry.created_at,
    updated_at: diaryEntry.updated_at,
  };

  if (userId === diaryEntry.userid) { // if user in diary Entry table is same as user making request
    res.status(200).json({
      data: fetchedDiaryEntry
    });
  } else {
    res.status(403).json({
      error: 'You are not authorised to perform this action'
    });
  }
};

export default authenticateUser;

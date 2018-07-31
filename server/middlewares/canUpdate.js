const hasUpdatablePeriodElapsed = (res, diaryEntry, callback) => {
  // reference - https://stackoverflow.com/questions/11072467/javascript-relative-time-24-hours-ago-etc-as-time

  const datePeriod = new Date().getTime() - new Date(diaryEntry.created_at).getTime();

  if (datePeriod > 60000) {
    res.status(403).json({
      message: 'You can no longer update this diary entry'
    });
  } else {
    callback();
  }
};

export default hasUpdatablePeriodElapsed;

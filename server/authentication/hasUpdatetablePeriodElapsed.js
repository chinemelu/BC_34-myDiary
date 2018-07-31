const hasUpdatablePeriodElapsed = (res, diaryEntry, callback) => {
  // convert date to time in ms   method obtained from stack overflow
  // reference - https://stackoverflow.com/questions/11072467/javascript-relative-time-24-hours-ago-etc-as-time
  // 86400000ms is 24 hours
  const datePeriod = new Date().getTime() - new Date(diaryEntry.created_at).getTime();
  // date period is the difference between today's date and time and that of when entry was created
  if (datePeriod > 60000) { // 60000ms is one minute
    res.status(403).json({
      message: 'You can no longer update this diary entry'
    });
  } else {
    callback();
  }
};

export default hasUpdatablePeriodElapsed;

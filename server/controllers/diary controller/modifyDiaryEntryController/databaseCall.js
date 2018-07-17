import isPrivacyEmpty from '../addDiaryEntryController/isPrivacyEmpty';

const modifyDiaryEntryDatabaseCall = (req, res, data, diaryEntry) => {
  // create a new object containing the updated values
  diaryEntry.title = data.title;
  diaryEntry.description = data.description;
  // if privacy field is empty, default value is private
  diaryEntry.privacy = isPrivacyEmpty(data);
  // add modified diaryEntry to dummy database;
  res.status(200).json({
    message: 'You have successfully updated the diary entry',
    data: diaryEntry
  });
};
export default modifyDiaryEntryDatabaseCall;

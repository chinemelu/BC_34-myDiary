import dummyDatabase from '../../../data structures/dummyDatabase';
import isPrivacyEmpty from './isPrivacyEmpty';

const addDiaryEntryDatabaseCall = (req, res, data) => {
  const {
    title,
    description
  } = data;

  const newDiaryEntry = {
    id: dummyDatabase.slice(-1)[0].id + 1,
    title,
    description,
    privacy: isPrivacyEmpty(data)
    // if privacy field is empty, default value is private
  };
  // add new data into dummy database
  dummyDatabase.push(newDiaryEntry);
  res.status(201).json({
    message: 'You have successfully created a new diary entry',
    data: newDiaryEntry
  });
};
export default addDiaryEntryDatabaseCall;

import dummyDatabase from '../../../data structures/dummyDatabase';
import validIdValidator from '../../../validators/validIdValidator/validIdValidator';

const getSingleDiaryEntryDatabaseCall = (req, res, callback) => {
  // Get id from params
  const { id } = req.params;
  // Validate the id and check if it's an integer - change to check for UUID later
  // remember to write test reflecting use of UUID later
  const { errors, isValid } = validIdValidator(req.params);
  // id from params is string and is converted to an integer for comparison purposes
  // filter each dummy database element based on id
  const selectedEntry = dummyDatabase.filter(entry => parseInt(id, 0) === entry.id);
  if (isValid && dummyDatabase.length > 0 && selectedEntry.length === 1) {
    callback(selectedEntry[0]);
  // if data doesn't exist, give 404 status and error message of not found
  } else if (isValid && dummyDatabase.length > 0 && selectedEntry.length === 0) {
    res.status(404).json({
      message: 'Diary entry not found'
    });
    // if validation error, give error message
  } else {
    res.status(400).json({
      errors: errors.id
    });
  }
};
export default getSingleDiaryEntryDatabaseCall;

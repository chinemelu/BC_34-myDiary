import dummyDatabase from '../../../data structures/dummyDatabase';
import validIdValidator from '../../../validators/validIdValidator/validIdValidator';

const deleteDiaryEntryDatabaseCall = (req, res, callback) => {
  const { id } = req.params; // Get id from params
  // Validate the id and check if it's an integer - change to check for UUID later
  // remember to write test reflecting use of UUID later
  const { errors, isValid } = validIdValidator(req.params);
  // find selectedEntry by using the params id to filter the dummyDatabase array
  const selectedEntry = dummyDatabase.filter(entry => parseInt(id, 0) === entry.id);
  const index = dummyDatabase.indexOf(selectedEntry[0]);
  if (isValid && index !== -1) { // if there are no validation errors and object is found
    dummyDatabase.splice(index, 1); //  remove object from dummyDatabase
  }
  if (isValid && selectedEntry.length === 1) {
    callback(selectedEntry[0]);
  // if data doesn't exist, give 404 status and error message of not found
  } else if (isValid && selectedEntry.length === 0) {
    res.status(404).json({
      message: 'Diary entry not found'
    });
  } else { // if validation error, give error message
    res.status(400).json({
      errors: errors.id
    });
  }
};
export default deleteDiaryEntryDatabaseCall;

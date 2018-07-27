import postDiaryEntryValidator from '../../../validators/diary validator/postDiaryEntryValidator';
import getSingleDiaryEntryDatabaseCall from '../getSingleDiaryEntryController/databaseCall';
import modifyDiaryEntryDatabaseCall from './databaseCall';

/**
 * @class diarycontroller
 */
class diarycontroller {
/**
   * @description modify diary entry
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static modifyEntry(req, res) {
    //  check to see if diary entry is in database
    const { id } = req.params;
    getSingleDiaryEntryDatabaseCall(req, res, id,
      (diaryEntry) => {
        // check if there are any validation errors
        // isEditing argument is made true because it's the PUT endpoint
        // Both PUT and POST endpoints share the same validator
        const { errors, isValid } = postDiaryEntryValidator(req.body, true, diaryEntry);
        if (isValid) {
          modifyDiaryEntryDatabaseCall(req, res, req.body, diaryEntry);
        } else {
          res.status(400).json({
            errors
          });
        }
      });
  }
}
export default diarycontroller;

import postDiaryEntryValidator from '../../../validators/postDiaryEntryValidator';
import getSingleDiaryEntryDatabaseCall from '../getSingleDiaryEntryController/databaseCall';
import modifyDiaryEntryDatabaseCall from './databaseCall';

/**
 * @class diarycontroller
 */
class diarycontroller {
/**
   * @description add diaryentry
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static modifyEntry(req, res) {
    //  check to see if diary entry is in database
    getSingleDiaryEntryDatabaseCall(req, res,
      (diaryEntry) => {
        // check if there are any validation errors
        const { errors, isValid } = postDiaryEntryValidator(req.body);
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

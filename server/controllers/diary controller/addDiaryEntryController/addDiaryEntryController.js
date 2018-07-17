import postDiaryEntryValidator from '../../../validators/postDiaryEntryValidator';
import addDiaryEntryDatabaseCall from './databaseCall';
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
  static addEntry(req, res) {
    // check if there are any validation errors
    const { errors, isValid } = postDiaryEntryValidator(req.body);
    if (isValid) {
      addDiaryEntryDatabaseCall(req, res, req.body);
    } else {
      res.status(400).json({
        errors
      });
    }
  }
}
export default diarycontroller;

import postDiaryEntryValidator from '../../../validators/postDiaryEntryValidator/index';
import addDiaryEntryDatabaseCall from './databaseCall';
/**
 * @class diarycontroller
 */
class diarycontroller {
/**
   * @description add diary entry
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static addEntry(req, res) {
    // check if there are any validation errors
    // isEditing argument in validator is false because it's a POST endpoint
    // Both PUT and POST endpoints share the same validator
    const { errors, isValid } = postDiaryEntryValidator(req.body, false);
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

import postDiaryEntryValidator from '../../../validators/diary validator/postDiaryEntryValidator/index';
import addDiaryEntryDatabaseCall from './databaseCall';
import authenticateToken from '../../../authentication/authenticateToken';
import doesUserExist from '../../../authentication/doesUserExist';
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
    const { errors, isValid } = postDiaryEntryValidator(req.body, false);
    /** isEditing argument set to false, because it's the POST route
    POST and PUT API routes share the same validator
    */
    if (isValid) {
      // validate the token
      authenticateToken(req, res, (decodedToken) => {
        doesUserExist(res, decodedToken.userId, (userId) => {
          // send the results of the database call if there are no validation errors
          addDiaryEntryDatabaseCall(req, res, userId);
        });
      });
    } else {
      res.status(400).json({
        errors
      });
    }
  }
}
export default diarycontroller;

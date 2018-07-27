import getSingleDiaryEntryDatabaseCall from './databaseCall';
import validIdValidator from '../../../validators/shared/validIdValidator/validIdValidator';
import authenticateToken from '../../../authentication/authenticateToken';
import authenticateUser from '../../../authentication/authenticateUser';

/**
 * @class diarycontroller
 */
class diarycontroller {
  /**
     * @description get single diary entry
     * @param {*} req http request
     * @param {*} res http response
     * @returns {JSON} returns a JSON object
     */
  static getSingleEntry(req, res) {
    // Validate the id and check if it's a UUID
    const { errors, isValid } = validIdValidator(req.params);

    if (isValid) { // if there are no validation errors, authenticate user via token
      authenticateToken(req, res, (decodedToken) => {
        const { userId } = decodedToken; // get userId from decoded token
        const { id } = req.params; // get id from params

        getSingleDiaryEntryDatabaseCall(req, res, id, (diaryEntry) => {
          // function for validating if user can perform action
          authenticateUser(userId, diaryEntry, res);
        });
      });
    } else {
      res.status(400).json({
        errors: errors.id
      });
    }
  }
}

export default diarycontroller;

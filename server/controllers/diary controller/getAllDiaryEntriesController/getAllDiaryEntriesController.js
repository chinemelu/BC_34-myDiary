import getAllMyEntriesDatabaseCall from './databaseCall';
import authenticateToken from '../../../authentication/authenticateToken';
import doesUserExist from '../../../authentication/doesUserExist';

/**
 * @class diarycontroller
 */
class diarycontroller {
  /**
     * @description get all diary entries
     * @param {*} req http request
     * @param {*} res http response
     * @returns  {Array} returns an array
     */
  static getAllEntries(req, res) {
    authenticateToken(req, res, (decodedToken) => {
      doesUserExist(res, decodedToken.userId, (verifiedExistingUserId) => {
        // send the results of the database call if there are no validation errors
        getAllMyEntriesDatabaseCall(res, verifiedExistingUserId, (results) => {
          res.status(200).json({
            data: results
          });
        });
      });
    });
  }
}
export default diarycontroller;

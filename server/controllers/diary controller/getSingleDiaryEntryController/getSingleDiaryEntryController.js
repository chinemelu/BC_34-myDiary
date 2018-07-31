import getSingleDiaryEntryDatabaseCall from './databaseCall';
import authenticateUser from '../../../authentication/authenticateUser';
import authenticateToken from '../../../authentication/authenticateToken';
import doesUserExist from '../../../authentication/doesUserExist';

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
    authenticateToken(req, res, (decodedToken) => {
      const { userId } = decodedToken;
      doesUserExist(res, userId, (verifiedExistingUserId) => {
        getSingleDiaryEntryDatabaseCall(req, res, (diaryEntry) => {
          authenticateUser(verifiedExistingUserId, diaryEntry, res, () => {
            res.status(200).send({
              data: diaryEntry
            });
          });
        });
      });
    });
  }
}

export default diarycontroller;

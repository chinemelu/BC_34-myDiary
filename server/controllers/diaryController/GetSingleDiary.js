import GetSingleDiaryEntryQuery from './getSingleEntryQuery';
import authenticateUser from '../../middlewares/authenticateUser';
import authenticateToken from '../../middlewares/authenticateToken';
import doesUserExist from '../../middlewares/doesUserExist';

/**
 * @class diarycontroller
 */
class DiaryController {
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
        GetSingleDiaryEntryQuery(req, res, (diaryEntry) => {
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

export default DiaryController;

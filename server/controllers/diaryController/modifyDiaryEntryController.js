import postDiaryEntryValidator from '../../helpers/diaryIndexValidator';
import getSingleDiaryEntryDatabaseCall from './getSingleEntryQuery';
import modifyDiaryEntryDatabaseCall from './modifyDiaryQuery';
import authenticateToken from '../../middlewares/authenticateToken';
import doesUserExist from '../../middlewares/doesUserExist';
import authenticateUser from '../../middlewares/authenticateUser';
import hasUpdatablePeriodElapsed from '../../middlewares/canUpdate';

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
    authenticateToken(req, res, (decodedToken) => {
      const { userId } = decodedToken;
      doesUserExist(res, userId, (verifiedExistingUserId) => {
        getSingleDiaryEntryDatabaseCall(req, res,
          (diaryEntry) => {
            const { errors, isValid } = postDiaryEntryValidator(req.body, true, diaryEntry);
            authenticateUser(verifiedExistingUserId, diaryEntry, res, () => {
              hasUpdatablePeriodElapsed(res, diaryEntry, () => {
                if (isValid) {
                  modifyDiaryEntryDatabaseCall(req, res);
                } else {
                  res.status(400).json({
                    errors
                  });
                }
              });
            });
          });
      });
    });
  // });
  }
}
export default diarycontroller;

import postDiaryEntryValidator from '../../../validators/diary validator/postDiaryEntryValidator';
import getSingleDiaryEntryDatabaseCall from '../getSingleDiaryEntryController/databaseCall';
import modifyDiaryEntryDatabaseCall from './databaseCall';
import authenticateToken from '../../../authentication/authenticateToken';
import doesUserExist from '../../../authentication/doesUserExist';
import authenticateUser from '../../../authentication/authenticateUser';
import hasUpdatablePeriodElapsed from '../../../authentication/hasUpdatetablePeriodElapsed';

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
        // res.status(200).json({ verifiedExistingUserId });
        //  check to see if diary entry is in database and if it is, get the diary entry
        getSingleDiaryEntryDatabaseCall(req, res,
          (diaryEntry) => {
            // check if there are any validation errors
            const { errors, isValid } = postDiaryEntryValidator(req.body, true, diaryEntry);
            authenticateUser(verifiedExistingUserId, diaryEntry, res, () => {
            /** POST and PUT API routes share the same validator
          isEditing argument set to true, because it's the PUT route
          diaryEntry argument is added to validator, because it's the PUT API route
          check if input value is undefined and if it is, leave value as that in database
          */
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

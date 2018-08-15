import { postDiaryEntryValidator } from '../../helpers/helper';
import getSingleDiaryEntryDatabaseCall from './getSingleEntryQuery';
import isPrivacyEmpty from '../../middlewares/isPrivacyEmpty';
import db from '../../models/db';
import authenticateToken from '../../middlewares/authenticateToken';
import doesUserExist from '../../middlewares/doesUserExist';
import authenticateUser from '../../middlewares/authenticateUser';

/**
 * @class diarycontroller
 */
class DiaryController {
/**
   * @description modify diary entry
   * @param {string} req http request
   * @param {string} res http response
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
              // reference - https://stackoverflow.com/questions/11072467/javascript-relative-time-24-hours-ago-etc-as-time
              const datePeriod = new Date().getTime() - new Date(diaryEntry.created_at).getTime();

              if (datePeriod > 86400000) {
                res.status(403).json({
                  message: 'You can no longer update this diary entry'
                });
              } else if (isValid) {
                const { id } = req.params;
                const {
                  title,
                  description,
                } = req.body;
                let { privacy } = req.body;
                privacy = isPrivacyEmpty(req.body);
                const text = 'UPDATE entries SET title=$1, description=$2, privacy=$3 WHERE id = $4  RETURNING\n'
                + 'id, title, description, privacy';
                const params = [title, description, privacy, id];
                db(text, params, (err, result) => {
                  if (err) {
                    return res.status(500).json({ error: err.stack });
                  }
                  res.status(200).json({
                    message: 'You have successfully updated the diary entry',
                    updated: result.rows[0]
                  });
                });
              } else {
                res.status(400).json({
                  errors
                });
              }
            });
          });
      });
    });
  }
}
export default DiaryController;

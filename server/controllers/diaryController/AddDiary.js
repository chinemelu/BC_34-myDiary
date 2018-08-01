import { postDiaryEntryValidator } from '../../helpers/helper';
import authenticateToken from '../../middlewares/authenticateToken';
import doesUserExist from '../../middlewares/doesUserExist';
import isPrivacyFieldEmpty from '../../middlewares/isPrivacyEmpty';
import db from '../../models/db';
/**
 * @class diarycontroller
 */
class DiaryController {
/**
   * @description add diary entry
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static addEntry(req, res) {
    const { errors, isValid } = postDiaryEntryValidator(req.body, false);
    if (isValid) {
      authenticateToken(req, res, (decodedToken) => {
        doesUserExist(res, decodedToken.userId, (userId) => {
          req.body.privacy = isPrivacyFieldEmpty(req.body);
          const text = 'INSERT INTO entries(title, description, privacy, userid) VALUES ($1, $2, $3, $4) RETURNING \n'
          + 'id, title, description, privacy';
          const params = [req.body.title, req.body.description, req.body.privacy, userId];
          db(text, params, (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.stack });
            }
            res.status(201).json({
              message: 'You have successfully posted the diary entry',
              data: result.rows[0]
            });
          });
        });
      });
    } else {
      res.status(400).json({
        errors
      });
    }
  }
}
export default DiaryController;

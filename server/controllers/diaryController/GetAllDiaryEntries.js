import authenticateToken from '../../middlewares/authenticateToken';
import doesUserExist from '../../middlewares/doesUserExist';
import db from '../../models/db';

/**
 * @class diarycontroller
 */
class DiaryController {
  /**
     * @description get all diary entries
     * @param {string} req http request
     * @param {string} res http response
     * @returns  {Array} returns an array
     */
  static getAllEntries(req, res) {
    authenticateToken(req, res, (decodedToken) => {
      doesUserExist(res, decodedToken.userId, (verifiedExistingUserId) => {
        const text = 'SELECT id, title, description, privacy, created_at, updated_at FROM entries WHERE userid = $1';
        const params = [verifiedExistingUserId];
        db(text, params, (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.stack });
          }
          if (Array.isArray(results.rows) && results.rows.length) {
            res.status(200).json({
              data: results.rows
            });
          } else {
            res.status(200).json({
              message: 'There are no available diary entries',
              data: results.rows
            });
          }
        });
      });
    });
  }
}
export default DiaryController;

import validIdValidator from '../../helpers/validIdValidator';
import db from '../../models/db';


const getSingleDiaryEntryDatabaseCall = (req, res, callback) => {
  const { id } = req.params;

  const { errors, isValid } = validIdValidator(req.params);
  if (isValid) {
    db('SELECT * FROM entries WHERE id = $1', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (results.rows.length) {
        callback(results.rows[0]);
      } else {
        res.status(404).json({
          message: 'Diary entry not found'
        });
      }
    });
  } else {
    res.status(400).json({
      errors: errors.id
    });
  }
};
export default getSingleDiaryEntryDatabaseCall;

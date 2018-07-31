import { Pool } from 'pg';
import validIdValidator from '../../../validators/shared/validIdValidator/validIdValidator';
import dbDetails from '../../../models/db';


const getSingleDiaryEntryDatabaseCall = (req, res, callback) => {
  // Get id from params
  const { id } = req.params;
  const pool = new Pool(dbDetails);
  // Validate the id and check if it's an integer - change to check for UUID later
  // remember to write test reflecting use of UUID later
  const { errors, isValid } = validIdValidator(req.params);
  if (isValid) { // if there are no validation errors
    pool.query('SELECT * FROM entries WHERE id = $1', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (results.rows.length) {
        // if request is successful and there are results, callback results
        callback(results.rows[0]);
        // if there's no result
      } else {
        res.status(404).json({
          message: 'Diary entry not found'
        });
      }
    });
    // if validation error, give error message
  } else {
    res.status(400).json({
      errors: errors.id
    });
  }
};
export default getSingleDiaryEntryDatabaseCall;

import { Pool } from 'pg';
import isPrivacyEmpty from '../addDiaryEntryController/isPrivacyEmpty';
import dbDetails from '../../../models/db';

const modifyDiaryEntryDatabaseCall = (req, res) => {
  const pool = new Pool(dbDetails);
  // get id from diary entry obtained via its id through the getSingleDiaryEntryDatabaseCall
  const { id } = req.params; // get the id from the params
  const {
    title,
    description,
  } = req.body;

  // equate req.body.privacy to the function that determines if privacy field is empty or not
  let { privacy } = req.body;
  privacy = isPrivacyEmpty(req.body);

  pool.query('UPDATE entries SET title=$1, description=$2, privacy=$3 WHERE id = $4  RETURNING\n'
    + 'id, title, description, privacy', [title, description, privacy, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.stack });
    }
    res.status(200).json({
      message: 'You have successfully updated the diary entry',
      updated: result.rows[0]
    });
  });
};
export default modifyDiaryEntryDatabaseCall;

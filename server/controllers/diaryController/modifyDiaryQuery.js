import isPrivacyEmpty from '../../middlewares/isPrivacyEmpty';
import db from '../../models/db';

const modifyDiaryEntryDatabaseCall = (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
  } = req.body;

  // equate req.body.privacy to the function that determines if privacy field is empty or not
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
};
export default modifyDiaryEntryDatabaseCall;

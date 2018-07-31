import db from '../../models/db';
import isPrivacyFieldEmpty from '../../middlewares/isPrivacyEmpty';

const addDiaryEntryDatabaseCall = (req, res, userId) => {
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
};
export default addDiaryEntryDatabaseCall;

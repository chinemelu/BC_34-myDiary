import { Pool } from 'pg';
import dbDetails from '../../../models/db';
import isPrivacyFieldEmpty from './isPrivacyEmpty';

const addDiaryEntryDatabaseCall = (req, res, userId) => {
  // if privacy field is empty, default value is private
  const pool = new Pool(dbDetails);
  req.body.privacy = isPrivacyFieldEmpty(req.body);

  const query = 'INSERT INTO entries(title, description, privacy, userid) VALUES ($1, $2, $3, $4) RETURNING \n'
  + 'id, title, description, privacy';

  const values = [req.body.title, req.body.description, req.body.privacy, userId];


  pool.query(query, values, (err, result) => {
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

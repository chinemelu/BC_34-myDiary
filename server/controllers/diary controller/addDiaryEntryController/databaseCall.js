import pool from '../../../models/db';
import isPrivacyFieldEmpty from './isPrivacyEmpty';

const addDiaryEntryDatabaseCall = (req, res, data, userId) => {
  data.privacy = isPrivacyFieldEmpty(data); // if privacy field is empty, default value is private
  pool.connect() // connect to database
    .then(client => client.query('INSERT INTO entries(title, description, privacy, userid) VALUES ($1, $2, $3, $4) RETURNING \n'
    + 'title, description, privacy',
    [req.body.title, req.body.description, req.body.privacy, userId])
      .then((result) => {
        res.status(201).json({
          message: 'You have successfully posted the diary entry',
          data: result.rows[0]
        });
        client.release();
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
        client.release();
      }));
};
export default addDiaryEntryDatabaseCall;

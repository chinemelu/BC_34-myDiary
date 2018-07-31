import db from '../../models/db';

const getAllMyEntriesDatabaseCall = (res, userId, callback) => {
  const text = 'SELECT * FROM entries WHERE userid = $1';
  const params = [userId];

  db(text, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.stack });
    }
    // check if result(s) is an array and if it's empty
    if (Array.isArray(results.rows) && results.rows.length) {
      // if request is successful and there are results, send data
      callback(results.rows);
    } else {
      res.status(200).json({
        message: 'There are no available diary entries'
      });
    }
  });
};
export default getAllMyEntriesDatabaseCall;

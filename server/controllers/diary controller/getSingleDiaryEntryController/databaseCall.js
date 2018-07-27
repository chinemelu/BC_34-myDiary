import pool from '../../../models/db';


const getSingleDiaryEntryDatabaseCall = (req, res, id, callback) => {
  pool.connect()
    .then(client => client.query('SELECT * FROM entries WHERE id = $1', [id])
      .then((results) => {
        // check if there's a result
        if (results.rows.length) {
          // if request is successful and there are results, callback results
          callback(results.rows[0]);
          client.release();
          // if there's no result
        } else {
          res.status(404).json({
            message: 'Diary entry not found'
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
        client.release();
      }));
};

export default getSingleDiaryEntryDatabaseCall;

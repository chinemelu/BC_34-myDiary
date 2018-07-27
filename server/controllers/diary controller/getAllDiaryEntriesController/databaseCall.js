import pool from '../../../models/db';


const getAllMyEntriesDatabaseCall = (res, userId, callback) => {
  pool.connect() // connect to database
    .then(client => client.query('SELECT * FROM entries WHERE userid = $1', [userId])
      .then((results) => {
        // check if result(s) is an array and if it's empty
        if (Array.isArray(results.rows) && results.rows.length) {
          // if request is successful and there are results, send data
          callback(results.rows);
          client.release();
        } else {
          res.status(200).json({
            message: 'There are no available diary entries'
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
        client.release();
      }));
};
export default getAllMyEntriesDatabaseCall;

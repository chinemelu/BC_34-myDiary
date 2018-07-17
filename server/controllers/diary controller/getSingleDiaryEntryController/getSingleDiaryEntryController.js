import getSingleDiaryEntryDatabaseCall from './databaseCall';
/**
 * @class diarycontroller
 */
class diarycontroller {
  /**
     * @description get single diary entry
     * @param {*} req http request
     * @param {*} res http response
     * @returns {JSON} returns a JSON object
     */
  static getSingleEntry(req, res) {
    getSingleDiaryEntryDatabaseCall(req, res, (dataEntry) => {
      if (dataEntry) {
        res.status(200).send({
          data: dataEntry
        });
      }
    });
  }
}

export default diarycontroller;

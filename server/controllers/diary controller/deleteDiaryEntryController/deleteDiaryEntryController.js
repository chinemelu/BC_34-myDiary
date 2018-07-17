import deleteDiaryEntryDatabaseCall from './databaseCall';

/**
 * @class diarycontroller
 */
class diarycontroller {
/**
   * @description delete diary entry
   * @param {*} req http request
   * @param {*} res http response
   * @returns {string} returns a string
   */
  static deleteEntry(req, res) {
    deleteDiaryEntryDatabaseCall(req, res, (diaryEntry) => {
      res.status(200).json({
        message: 'You have successfully deleted the diary entry',
        deleted: diaryEntry
      });
    });
  }
}


export default diarycontroller;

import dummyDatabase from '../../../data structures/dummyDatabase';
/**
 * @class diarycontroller
 */
class diarycontroller {
  /**
     * @description get all diary entries
     * @param {*} req http request
     * @param {*} res http response
     * @returns  {Array} returns an array
     */
  static getAllEntries(req, res) {
    // after authentication
    // Check if diary entries table in database is empty
    if (dummyDatabase.length > 0) {
      res.status(200).json({
        data: dummyDatabase
      });
    } else {
      // if empty, let user see a message indicating an empty diary entries list
      /** REMEMBER TO WRITE TEST CHECKING IF DATABASE IS EMPTY
      AND IF THE CORRESPONDING ERROR MESSAGE IS SENT */
      res.status(200).json({
        message: 'There are no available diary entries'
      });
    }
  }
}
export default diarycontroller;

import dummyDatabase from '../../data structures/dummyDatabase';

/**
 * @class diarycontroller
 */
class diarycontroller {
  /**
     * @description get all diary entries
     * @param {*} req http request
     * @param {*} res http response
     * @returns {JSON} returns a JSON object
     */
  static getAllEntries(req, res) {
    res.status(200).json({
      data: dummyDatabase
    });
  }
}

export default diarycontroller;

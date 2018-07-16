import postDiaryEntryValidator from '../../validators/postDiaryEntryValidator';
import dummyDatabase from '../../data structures/dummyDatabase';

/**
 * @class diarycontroller
 */
class diarycontroller {
/**
   * @description add diaryentry
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static addEntry(req, res) {
    // check if there are any validation errors
    const { errors, isValid } = postDiaryEntryValidator(req.body);

    if (isValid) {
      const {
        title,
        description,
        privacy
      } = req.body;

      // create a function to check if the privacy field is empty

      const isPrivacyEmpty = () => {
        if (!(privacy)) {
          return 'private';
        }
        return privacy;
      };

      const newDiaryEntry = {
        id: dummyDatabase.slice(-1)[0].id + 1,
        title,
        description,
        privacy: isPrivacyEmpty()
        // if privacy field is empty, default value is private
      };

      // add new data into dummy database
      dummyDatabase.push(newDiaryEntry);

      res.status(201).json({
        message: 'You have successfully created a new diary entry',
        data: newDiaryEntry
      });
    } else {
      res.status(400).json({
        errors
      });
    }
  }
}


export default diarycontroller;

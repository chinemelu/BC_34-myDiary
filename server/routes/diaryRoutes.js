import express from 'express';
import addDiaryEntryController from '../controllers/diaryController/AddDiary';
import getAllUserDiaryEntriesController from '../controllers/diaryController/GetAllDiaryEntries';
import getSingleDiaryEntryController from '../controllers/diaryController/GetSingleDiary';
import modifyDiaryEntryController from '../controllers/diaryController/ModifyDiary';

const router = express.Router();

router.post(
  '/', addDiaryEntryController.addEntry
);
router.get(
  '/', getAllUserDiaryEntriesController.getAllEntries
);
router.get(
  '/:id', getSingleDiaryEntryController.getSingleEntry
);
router.put(
  '/:id', modifyDiaryEntryController.modifyEntry
);

export default router;

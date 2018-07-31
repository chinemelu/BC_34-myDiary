import express from 'express';
import addDiaryEntryController from '../controllers/diaryController/addDiaryEntryController';
import getAllUserDiaryEntriesController from '../controllers/diaryController/getAllDiaryEntriesController';
import getSingleDiaryEntryController from '../controllers/diaryController/getSingleDiaryEntryController';
import modifyDiaryEntryController from '../controllers/diaryController/modifyDiaryEntryController';

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

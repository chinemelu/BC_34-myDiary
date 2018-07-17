import express from 'express';
import addDiaryEntryController from '../controllers/diary controller/addDiaryEntryController/addDiaryEntryController';
import getAllDiaryEntriesController from '../controllers/diary controller/getAllDiaryEntriesController/getAllDiaryEntriesController';
import getSingleDiaryEntryController from '../controllers/diary controller/getSingleDiaryEntryController/getSingleDiaryEntryController';
import modifyDiaryEntryController from '../controllers/diary controller/modifyDiaryEntryController/modifyDiaryEntryController';
import deleteDiaryEntryController from '../controllers/diary controller/deleteDiaryEntryController/deleteDiaryEntryController';

const router = express.Router();

router.post(
  '/', addDiaryEntryController.addEntry
);
router.get(
  '/', getAllDiaryEntriesController.getAllEntries
);
router.get(
  '/:id', getSingleDiaryEntryController.getSingleEntry
);
router.put(
  '/:id', modifyDiaryEntryController.modifyEntry
);
router.delete(
  '/:id', deleteDiaryEntryController.deleteEntry
);
export default router;

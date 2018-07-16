import express from 'express';
import addDiaryEntryController from '../controllers/diary controller/addDiaryEntryController';
import getAllDiaryEntriesController from '../controllers/diary controller/getAllDiaryEntriesController';
import getSingleDiaryEntryController from '../controllers/diary controller/getSingleDiaryEntryController';

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

export default router;

import express from 'express';
import addDiaryEntryController from '../controllers/diary controller/addDiaryEntryController';
import getAllDiaryEntriesController from '../controllers/diary controller/getAllDiaryEntriesController';

const router = express.Router();

router.post(
  '/', addDiaryEntryController.addEntry
);

router.get(
  '/', getAllDiaryEntriesController.getAllEntries
);

export default router;

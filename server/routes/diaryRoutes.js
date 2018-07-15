import express from 'express';
import addDiaryEntryController from '../controllers/diary controller/addDiaryEntryController';

const router = express.Router();

router.post(
  '/', addDiaryEntryController.addEntry
);

export default router;

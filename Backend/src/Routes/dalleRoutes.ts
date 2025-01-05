import express from 'express';
import { dalleController } from '../Controllers/dalleController';

const router = express.Router();

// Use the specific method from the controller
router.post('/', dalleController.generateImage);

export default router;

import express from 'express';
import { dalleController } from '../Controllers/dalleController';

const router = express.Router();


router.post('/', dalleController.generateImage);

export default router;

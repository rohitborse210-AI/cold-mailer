import express from 'express';
import { generateEmails, getMyEmails, getEmailById,updateEmail } from '../controller/mail.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();
router.post('/genrate', authMiddleware,generateEmails);
router.get('/send', authMiddleware,getMyEmails);
router.get('/:id', authMiddleware,updateEmail);
router.get("/:id", authMiddleware, getEmailById);
// router.post("/:id", authMiddleware, getAllMails);

export default router;

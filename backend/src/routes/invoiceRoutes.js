import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { uploadInvoice, getInvoices } from '../controllers/invoiceController.js';

const router = express.Router();

router.use(protect);

router.post('/upload', upload.single('file'), uploadInvoice);
router.get('/', getInvoices);

export default router;

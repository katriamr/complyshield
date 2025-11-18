import Invoice from '../models/Invoice.js';
import { parseInvoiceFile } from '../services/ocrService.js';

export const uploadInvoice = async (req, res) => {
  const companyId = req.user.company?._id || req.user.company;
  if (!companyId) return res.status(400).json({ message: 'Setup company first' });

  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  const parsed = await parseInvoiceFile(file.path);

  const invoice = await Invoice.create({
    company: companyId,
    filePath: file.path,
    ...parsed
  });

  res.status(201).json(invoice);
};

export const getInvoices = async (req, res) => {
  const companyId = req.user.company?._id || req.user.company;
  if (!companyId) return res.status(400).json({ message: 'Setup company first' });

  const invoices = await Invoice.find({ company: companyId }).sort({ createdAt: -1 });
  res.json(invoices);
};

export const parseInvoiceFile = async (filePath) => {
  // Yaha later tesseract / external OCR laga sakte ho
  // Abhi dummy data return kar dete hain.
  return {
    invoiceNumber: 'INV-' + Date.now(),
    date: new Date(),
    customerName: 'Demo Customer',
    amount: 1000,
    hsnCode: '',
    gstRate: 18
  };
};

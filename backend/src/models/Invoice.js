import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    filePath: { type: String },
    invoiceNumber: { type: String },
    date: { type: Date },
    customerName: { type: String },
    amount: { type: Number },
    hsnCode: { type: String },
    gstRate: { type: Number },
    status: { type: String, enum: ['RAW', 'PARSED'], default: 'PARSED' }
  },
  { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;

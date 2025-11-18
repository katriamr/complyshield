import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    rule: { type: mongoose.Schema.Types.ObjectId, ref: 'ComplianceRule', required: true },
    periodLabel: { type: String, required: true }, // e.g. "Apr 2025"
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['PENDING', 'FILED', 'OVERDUE'], default: 'PENDING' },
    filedAt: { type: Date },
    filedReferenceNumber: { type: String }
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;

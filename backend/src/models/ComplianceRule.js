import mongoose from 'mongoose';

const complianceRuleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // e.g. GSTR-1
    code: { type: String, required: true, unique: true }, // e.g. GSTR1_MONTHLY
    description: { type: String },
    frequency: { type: String, enum: ['MONTHLY', 'QUARTERLY', 'YEARLY'], required: true },
    formType: { type: String, enum: ['GST', 'TDS', 'EWAY', 'OTHER'], default: 'OTHER' },
    conditions: {
      minTurnover: { type: Number, default: 0 },
      entityTypes: [{ type: String }],
      states: [{ type: String }]
    },
    dueDay: { type: Number, default: 11 } // e.g. 11th of next month
  },
  { timestamps: true }
);

const ComplianceRule = mongoose.model('ComplianceRule', complianceRuleSchema);
export default ComplianceRule;

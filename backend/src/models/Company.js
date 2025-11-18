import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP', 'OTHER'], default: 'OTHER' },
    turnover: { type: Number, default: 0 },
    state: { type: String, required: true },
    gstNumber: { type: String }
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
export default Company;

import Invoice from '../models/Invoice.js';

export const getRiskSummary = async (companyId) => {
  const missingHSNCount = await Invoice.countDocuments({
    company: companyId,
    $or: [{ hsnCode: { $exists: false } }, { hsnCode: '' }]
  });

  return {
    missingHSNCount
  };
};

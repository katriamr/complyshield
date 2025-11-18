import ComplianceRule from '../models/ComplianceRule.js';

export const seedDefaultRules = async (req, res) => {
  const count = await ComplianceRule.countDocuments();
  if (count > 0) return res.json({ message: 'Rules already exist' });

  await ComplianceRule.insertMany([
    {
      name: 'GSTR-1',
      code: 'GSTR1_MONTHLY',
      description: 'Monthly outward supply return',
      frequency: 'MONTHLY',
      formType: 'GST',
      conditions: {
        minTurnover: 0,
        entityTypes: [],
        states: []
      },
      dueDay: 11
    },
    {
      name: 'GSTR-3B',
      code: 'GSTR3B_MONTHLY',
      description: 'Monthly summary return',
      frequency: 'MONTHLY',
      formType: 'GST',
      conditions: {
        minTurnover: 0,
        entityTypes: [],
        states: []
      },
      dueDay: 20
    }
  ]);

  res.json({ message: 'Default rules seeded' });
};

export const getRules = async (req, res) => {
  const rules = await ComplianceRule.find({});
  res.json(rules);
};

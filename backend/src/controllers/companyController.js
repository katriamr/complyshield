import Company from '../models/Company.js';
import { getApplicableRulesForCompany } from '../services/ruleEngineService.js';
import { generateMonthlyTasksForCompany } from '../services/schedulerService.js';

export const upsertCompany = async (req, res) => {
  const { name, type, turnover, state, gstNumber } = req.body;
  let company = await Company.findOne({ owner: req.user._id });

  if (!company) {
    company = await Company.create({
      owner: req.user._id,
      name,
      type,
      turnover,
      state,
      gstNumber
    });
  } else {
    company.name = name;
    company.type = type;
    company.turnover = turnover;
    company.state = state;
    company.gstNumber = gstNumber;
    await company.save();
  }

  req.user.company = company._id;
  await req.user.save();

  res.json(company);
};

export const getMyCompany = async (req, res) => {
  const company = await Company.findOne({ owner: req.user._id });
  res.json(company);
};

export const getApplicableRules = async (req, res) => {
  const company = await Company.findOne({ owner: req.user._id });
  if (!company) return res.status(400).json({ message: 'Setup company first' });

  const rules = await getApplicableRulesForCompany(company);
  res.json(rules);
};

export const generateTasks = async (req, res) => {
  const company = await Company.findOne({ owner: req.user._id });
  if (!company) return res.status(400).json({ message: 'Setup company first' });

  const rules = await getApplicableRulesForCompany(company);
  await generateMonthlyTasksForCompany(company, rules, req.user);

  res.json({ message: 'Tasks generated' });
};

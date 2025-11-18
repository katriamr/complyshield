import ComplianceRule from '../models/ComplianceRule.js';

export const getApplicableRulesForCompany = async (company) => {
  const allRules = await ComplianceRule.find({});
  return allRules.filter((rule) => {
    const cond = rule.conditions || {};
    if (cond.minTurnover && company.turnover < cond.minTurnover) return false;
    if (cond.entityTypes && cond.entityTypes.length && !cond.entityTypes.includes(company.type)) return false;
    if (cond.states && cond.states.length && !cond.states.includes(company.state)) return false;
    return true;
  });
};

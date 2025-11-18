import Task from '../models/Task.js';
import { addMonths, endOfMonth } from 'date-fns';
import Notification from '../models/Notification.js';

export const generateMonthlyTasksForCompany = async (company, rules, user) => {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1); // previous month
  const periodEnd = endOfMonth(periodStart);

  for (const rule of rules) {
    const periodLabel = `${periodStart.toLocaleString('default', {
      month: 'short'
    })} ${periodStart.getFullYear()}`;

    const existing = await Task.findOne({
      company: company._id,
      rule: rule._id,
      periodLabel
    });

    if (existing) continue;

    const dueDate = new Date(periodEnd);
    dueDate.setDate(rule.dueDay || 11);
    dueDate.setMonth(periodEnd.getMonth() + 1);

    await Task.create({
      company: company._id,
      rule: rule._id,
      periodLabel,
      periodStart,
      periodEnd,
      dueDate
    });

    await Notification.create({
      user: user._id,
      company: company._id,
      title: `New compliance task: ${rule.name}`,
      message: `${rule.name} created for period ${periodLabel}`
    });
  }
};

export const sendDueReminders = async () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const tasks = await Task.find({
    status: { $ne: 'FILED' },
    dueDate: { $gte: today, $lte: tomorrow }
  }).populate('company rule');

  for (const task of tasks) {
    const user = task.company.owner;
    await Notification.create({
      user,
      company: task.company._id,
      title: `${task.rule.name} due soon`,
      message: `${task.rule.name} for ${task.periodLabel} is due on ${task.dueDate.toDateString()}`
    });
  }
};

import Task from '../models/Task.js';
import { getRiskSummary } from '../services/penaltyCheckerService.js';

export const getMyTasks = async (req, res) => {
  const companyId = req.user.company?._id || req.user.company;
  if (!companyId) return res.status(400).json({ message: 'Setup company first' });

  const tasks = await Task.find({ company: companyId })
    .populate('rule')
    .sort({ dueDate: 1 });

  res.json(tasks);
};

export const markTaskFiled = async (req, res) => {
  const { id } = req.params;
  const { filedReferenceNumber } = req.body;

  const task = await Task.findById(id).populate('company');
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.company.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  task.status = 'FILED';
  task.filedAt = new Date();
  task.filedReferenceNumber = filedReferenceNumber || '';
  await task.save();

  res.json(task);
};

export const getRiskForCompany = async (req, res) => {
  const companyId = req.user.company?._id || req.user.company;
  if (!companyId) return res.status(400).json({ message: 'Setup company first' });

  const summary = await getRiskSummary(companyId);
  res.json(summary);
};

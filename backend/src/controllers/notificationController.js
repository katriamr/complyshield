import Notification from '../models/Notification.js';

export const getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findById(id);

  if (!notification) return res.status(404).json({ message: 'Not found' });
  if (notification.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  notification.isRead = true;
  await notification.save();
  res.json(notification);
};

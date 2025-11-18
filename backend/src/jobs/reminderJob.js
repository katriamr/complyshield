import cron from 'node-cron';
import { sendDueReminders } from '../services/schedulerService.js';

cron.schedule('0 9 * * *', async () => {
  console.log('Running daily reminder job...');
  await sendDueReminders();
});

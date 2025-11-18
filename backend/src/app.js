import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import ruleRoutes from './routes/ruleRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import testRoutes from "./routes/testRoutes.js";

import { notFound, errorHandler } from './middleware/errorMiddleware.js';


console.log("🤖 Loaded testRoutes =", testRoutes);

const app = express();

// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('src/uploads'));

app.use("/api/test", testRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'ComplyShield API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

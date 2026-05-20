import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contentRouter from './routes/content';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/content', contentRouter);

mongoose
.connect(process.env.MONGODB_URI as string)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

app.get('/health', (_req, res) => {
res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));



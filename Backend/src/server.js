import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import sellerRouter from './routes/sellerRouter.js';
import clientRouter from './routes/clientRouter.js';
import itemRouter from './routes/itemRouter.js';
import idsRouter from './routes/idsRouter.js';
import chatRouter from './routes/chatRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/sellers', sellerRouter);
app.use('/api/clients', clientRouter);
app.use('/api/items', itemRouter);
app.use('/api/ids', idsRouter);
app.use('/api/chats', chatRouter);

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

mongoose.connect(process.env.MONGO_URL,)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
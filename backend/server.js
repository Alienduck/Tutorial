import express from 'express';
import dotenv from 'dotenv';
import db from '../backend/db/db.js';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

db();

app.use('/user', userRoute)
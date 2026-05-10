import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/mongoConfig.js';
import userRouter from './src/features/user/user.router.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/user',userRouter);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port http://localhost:${PORT}`);
});
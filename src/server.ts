import express from 'express';
import userRouter from './routes/userRoutes';
import { contentRouter } from './routes/ContentRouter';
import { LinkRouter } from './routes/LinkRouter';
import { connectDB } from './config/db';
import errorHandler from './middlewares/errorMiddleware';
import dotenv from 'dotenv';
import auth from './middlewares/authMiddleware';
import cookieParser from 'cookie-parser'
dotenv.config();



const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', auth, contentRouter);
app.use('/api/v1/brain', LinkRouter);
app.use(errorHandler);


const startServer = () => {
    try {
        connectDB();
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    } catch (error) {
        console.log(error);
    }
}

startServer(); 
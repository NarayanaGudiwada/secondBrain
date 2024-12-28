import {Router } from 'express';
import { signup, signin } from '../controllers/UserController';

export const userRouter = Router();

// @ts-ignore
userRouter.post('/signup',signup);    

// @ts-ignore
userRouter.post('/signin', signin);

export default userRouter;
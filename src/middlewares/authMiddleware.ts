import { Request, Response, NextFunction } from 'express';
import { decodeToken } from "../utils/authUtils";
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).send({ message: 'Unauthorized' });
        } else {
            const decodedToken = decodeToken(token);
            const userId = decodedToken.userId;
            //@ts-ignore
            req.userId = userId;
            next();
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                message: 'Session time out'
            });
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                message: 'Invalid token'
            });
        } else {
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

export default auth;
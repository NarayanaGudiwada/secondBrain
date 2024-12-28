import { Request, Response } from "express";

export const shareLink = async (req: Request, res: Response) => {
    res.send('shareLink');
}

export const accessLink = async (req: Request, res: Response) => {
    res.send('accessLink');
}
import { Request, Response } from "express";

export const addContent = async (req: Request, res: Response) => {
    res.send('addContent');
}

export const getContent = async (req: Request, res: Response) => {
    res.send('getContent');
}

export const deleteContent = async (req: Request, res: Response) => {
    res.send('deleteContent');
}
import { Request, Response } from "express";
import { ContentSchema } from "../ValidationSchema/ContentTypes";
import { createContent } from "../service/ContentService";

export const addContent = async (req: Request, res: Response) => {
    const { success, data, error } = ContentSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: error.errors.map(err => err.message).join(', ')
        });
    } else {
        //@ts-ignore
        await createContent(data, req.userId);
        res.status(200).json({
            'message': 'Content added successfully'
        })
    }
}

export const getContent = async (req: Request, res: Response) => {
    res.send('getContent');
}

export const deleteContent = async (req: Request, res: Response) => {
    res.send('deleteContent');
}
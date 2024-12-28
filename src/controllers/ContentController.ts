import { Request, Response } from "express";
import { ContentSchema } from "../ValidationSchema/ContentTypes";
import { createContent, deleteContentById, getAllContent } from "../service/ContentService";
import { SBError } from "../utils/SBError";

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
    //@ts-ignore
    const content = await getAllContent(req.userId);

    res.status(200).json({ content });
}

export const deleteContent = async (req: Request, res: Response) => {
    //TODO: implement global error handling middleware properly.
    try {
        //@ts-ignore
        await deleteContentById(req.body.contentId, req.userId);


        res.status(200).json({
            'message': 'Deleted successfully'
        })
    } catch (e) {
       console.log(e);
       res.status(403).json({
           //@ts-ignore
        'message': e.message
       })

    }
}
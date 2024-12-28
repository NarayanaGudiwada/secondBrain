import { Router } from "express";
import { addContent, deleteContent, getContent } from "../controllers/ContentController";

export const contentRouter = Router();

//@ts-ignore
contentRouter.post("/",addContent);

//@ts-ignore
contentRouter.get("/",getContent);

//@ts-ignore
contentRouter.delete("/",deleteContent);
import { Router } from "express";
import { addContent, deleteContent, getContent } from "../controllers/ContentController";

export const contentRouter = Router();

contentRouter
    .post("/", addContent)
    .get("/", getContent)
    .delete("/", deleteContent);

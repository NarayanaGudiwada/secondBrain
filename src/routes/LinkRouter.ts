import { Router } from "express";
import { accessLink, shareLink } from "../controllers/LinkController";

export const LinkRouter = Router();

LinkRouter.post("/", shareLink);

LinkRouter.get("/:shareLink", accessLink);
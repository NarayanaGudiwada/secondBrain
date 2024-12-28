import { Router } from "express";
import { accessLink, shareLink } from "../controllers/LinkController";

export const LinkRouter = Router();


//@ts-ignore
LinkRouter.post("/", shareLink);

//@ts-ignore
LinkRouter.get("/:shareLink", accessLink);
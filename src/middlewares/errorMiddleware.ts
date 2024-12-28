import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { SBError } from "../utils/SBError";


const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof SBError) {
        res.status(err.code).json({
            'message': err.message
        })
    } else {
        res.status(500).json({
            'message': 'Internal server error'
        })
    }

}

export default errorHandler;
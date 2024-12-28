import { Request, Response, NextFunction, ErrorRequestHandler } from "express";


const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    res.status(500).json({
        'message': 'Internal server error'
    })
}

export default errorHandler;
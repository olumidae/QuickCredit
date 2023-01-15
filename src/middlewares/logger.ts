import express, {NextFunction, Request, Response} from 'express';

const app = express()

export const routeLogger = (req:Request, res:Response, next:NextFunction) => {
    console.log(`${req.method} Request from IP: ${req.ip} to Route: ${req.originalUrl} with Body: ${req.body}`);
    next();
};

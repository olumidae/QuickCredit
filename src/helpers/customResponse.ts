import { Response } from 'express';

export class CustomResponse {
    public okResponse = (res: Response, status: number, data: any) => {
        return res.status(status).send({
            status: 'success',
            data
        });
    };

    public errorResponse = (res: Response, status: number, message: string, data?: any) => {
        return res.status(status).send({
            status: 'error',
            message,
            data
        });
    }
}
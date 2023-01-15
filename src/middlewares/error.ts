import { NextFunction, Request, Response } from "express";
// @ts-ignore
import { CustomResponse } from "../helpers/customResponse";

export class Error {
    private customResponse: CustomResponse;

    constructor() {
        this.customResponse = new CustomResponse();
    }

    public errorHandler = (err:any, req:Request, res:Response, next: NextFunction) => {
        return this.customResponse.errorResponse(
            res,
            err.status || 500,
            err.message,
            err.data || {}
        )
    }
}
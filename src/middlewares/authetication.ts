import { NextFunction, Request, Response } from "express";
import { Exception } from "./exception";
import jwt from "jsonwebtoken";
import { config } from "../config";

export class Authentication {
	public validateToken = async (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers;

		if (!authorization) {
			let err = new Exception(400, 'Header does not contain authorization token');
			return next(err);
		}

		const split_token = authorization.split(' ');

		if (split_token.length !== 2 || split_token[0] != "Bearer") {
            let err = new Exception(400, 'Unauthorized. Invalid token!');
            return next(err);
		}

        jwt.verify(split_token[1], config.secret!, { algorithms: ['HS256'] }, (error, decoded: any) => {
            if (error || !decoded) {
                let err = new Exception(400, 'Unauthorized. The token supplied is invalid or expired');
                return next(err);
            }
            req.user = decoded;
            return next();
        })
	};
}

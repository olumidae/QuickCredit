import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomResponse } from "../../helpers/customResponse";
import { config } from "../../config";
import { Exception } from "../../middlewares/exception";
import { logger } from "../../helpers/logger";

const DB = require("../../database/models");
// console.log(DB)
const User = DB.User;

export class UserService {
	private customResponse: CustomResponse;

	constructor() {
		this.customResponse = new CustomResponse();
	}

	public signupUser = async (req: Request, res: Response, next: NextFunction) => {
		User.findOne({
			where: {
				email: req.body.email,
			},
		}).then((userExists: any) => {
			if (userExists) {
				return this.customResponse.errorResponse(res, 400, "User alreasy exists");
			}
			console.log('>>>>>: ', req.body);
			User.create({
				...req.body,
				password: bcrypt.hashSync(req.body.password, 11),
				active: false,
			}).then((user: any) => {
				//create token for user
				const today_date = new Date();
				const token = jwt.sign(
					{
						id: user.id,
						exp: today_date.setDate(today_date.getHours() + 24),
					},
					config.secret
				);

				// send email to user on user creation

				return this.customResponse.okResponse(res, 201, {
					message:
						"Successfully signed up. Check your email to activate account",
					data: token,
				});
			});
		}).catch((err: Error) => {
            next(err);
        });
	};
}

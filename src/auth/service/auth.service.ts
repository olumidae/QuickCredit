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
			logger.info(userExists)
			if (userExists) {
				return this.customResponse.errorResponse(res, 400, "User alreasy exists");
			}
			
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

	public loginUser = async (req: Request, res: Response, next: NextFunction) => {
		    // validate user exists 
			try {
				User.findOne({
					where: {
						email: req.body.email,
					}
				}).then((userExist: any) => {
					if (!userExist) return this.customResponse.errorResponse(res, 400, 'Invalid email or password');
					// if user is inactive, return error
					if (userExist.active === false) return this.customResponse.errorResponse(res, 400, 'User is inactive')     
					//compare passwords
					if(!bcrypt.compareSync(req.body.password, userExist.password)) {
						//password is wrong, check logincount if its less than 5, update and if more than 5 deactivate account
						return this.customResponse.errorResponse(res, 400, "Invalid email or password");			          
					}
		
					// create token for user
					const token = jwt.sign({
						id: userExist.id,
						email: userExist.email,
					}, config.secret);
		
					return this.customResponse.okResponse(res, 200, {
						data: token
					})
		
				}).catch((err: Error) => {
					console.log('Error', err);
					next(err);
				})
			} catch (error) {
				console.error(error);
			}
	}

	public verifyUser = async (req: Request, res: Response, next: NextFunction) => {
		//
		User.findOne({
			where: {
				email: req.body.email,
			}
		}).then((userExist: any)=> {
			if(!userExist) return this.customResponse.errorResponse(res, 404, 'User not found', {});

			const updatedUser = userExist.update({
				status: 'verified'
			})

			return this.customResponse.okResponse(res, 200, updatedUser)
		})
	}
}

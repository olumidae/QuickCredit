import {Request, Response, NextFunction, Router} from 'express';
import { signUpSchema } from '../schema/signup.schema';
// import { loginSchema } from '../schema/login.schema';
import { UserService } from '../service/auth.service';
import { Exception } from '../../middlewares/exception';
import { logger } from '../../helpers/logger';
import { loginSchema } from '../schema/login.schema';

export class AuthController {
    public router : Router;
    public userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.router = Router();
        this.routes();
    }

    public signUp = async(req: Request, res: Response, next: NextFunction) => {     
        const { error, value } = signUpSchema.validate(req.body);

        console.log(`${req.method}: Request from IP: ${req.ip} to Route: ${req.originalUrl}: with Body: ${req.body}`);
        if (error) {
            let err = new Exception(400, 'Validation Error', error.details);
            return next(err);
        } else {
            req.body = value;
            return await this.userService.signupUser(req, res, next)
        }
    }

    public login = async(req: Request, res: Response, next: NextFunction) => {
        const {error, value } = loginSchema.validate(req.body);

        if (error) {
            let err = new Exception(400, 'Validation Error', error.details);
            return err;
        } else {
            req.body = value;
            return await this.userService.loginUser(req, res, next);
        }
    };

    public verifyUser = async(req: Request, res:Response, next:NextFunction) => {
        const { email } = req.params;
        if (email == undefined) {
            let err = new Exception(400, 'Email not found');
            return err;
        } else {
            return this.userService.verifyUser(req, res, next)
        }
    }

    public routes = () => {
        this.router.post('/signup', this.signUp);
        this.router.post('/login', this.login);
        this.router.patch('/users/:email/verify', this.verifyUser);
    }
}
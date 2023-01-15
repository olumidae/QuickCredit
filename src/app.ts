import express ,{ Request, Response }from 'express';
import cors from 'cors';
import { json as jsonParser, urlencoded } from 'body-parser';
import { Sequelize } from 'sequelize';
import { Error } from './middlewares/error';
import { config } from './config/index';
import { logger } from './helpers/logger';
import { AuthController } from './auth/controller/auth.controller';
import { createConnection } from 'typeorm';
// import { routeLogger } from './middlewares/logger';
const {name, username, password} = config.db

class Server {

    private app: express.Application; 
    private sequelize: Sequelize;
    private authController: AuthController;
    private error: Error;
   
    constructor() {
        this.app = express();
        this.configuration();
        this.authController = new AuthController();
        this.error = new Error();
        this.sequelize = new Sequelize(name, username, password, { dialect: 'postgres' });
        this.routes();

    }

    
    public configuration() {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(jsonParser());

        this.app.use(cors()); 

    }

    public async routes() {
        this.app.use('/api/v1/auth', this.authController.router);

        this.app.use(this.error.errorHandler); 

        this.app.use('/', (req: Request, res: Response) => res.send('It works'));
        
    }

    public start() {
        // initiate the app here and make it 
        this.app.listen(this.app.get('port'), () => {
            logger.info(`Server is listening on port: ${this.app.get('port')}`)
        });

        this.sequelize.authenticate().then(() => logger.info('Database connection successful'))
        .catch(e => logger.error('Connection failed'))
    }

}

const server = new Server();
server.start();
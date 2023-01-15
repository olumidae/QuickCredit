import * as joi from '@hapi/joi';
import * as dotenv from 'dotenv';

dotenv.config();

const envVarSchema = joi.object({
    PORT: joi.number().default('5000'),
    NODE_ENV: joi.string().allow('development', 'production', 'test').required(),
    DEVELOPMENT_START_COMMAND: joi.string().default('npm run start:dev'),
    LOG_LEVEL: joi.string().allow('error', 'warning', 'info', 'debug', 'silly').default('silly'),
    SECRET: joi.string().required(),

    //email config
    // EMAIL_ACCOUNT: joi.string().required(),
    // EMAIL_PASSWORD: joi.string().required(),
    // SENDGRID_API_KEY: joi.string().required(),

    FEND_URL: joi.string().required(),

    //database config
    PGHOST: joi.string().required(),
    PGUSER: joi.string().required(),
    PGPASSWORD: joi.string().required(),
    PGDATABASE: joi.string().required(),
    PGPORT: joi.number().port().required().default(5432),
    DATABASE_LOGGING: joi.boolean().truthy('x').truthy('true').falsy('FALSE').falsy('false').default(false),

}).unknown().required();

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config Validation Error: ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    url: envVars.APP_URL,
    port: envVars.PORT,
    loglevel: envVars.LOG_LEVEL,
    isDevelopment: envVars.NODE_ENV === 'development',
    isTest: envVars.NODE_ENV === 'test',
    isProduction: envVars.NODE_ENV === 'production',
    secret: envVars.SECRET,
    emailAccount: envVars.EMAIL_ACCOUNT,
    emailPassword: envVars.EMAIL_PASSWORD,
    sendGridApiKey: envVars.SENDGRID_API_KEY,
    fendUrl: envVars.FEND_URL,
    db: {
        host: envVars.PGHOST,
        username: envVars.PGUSER,
        password: envVars.PGPASSWORD,
        name: `${envVars.PGDATABASE}${envVars.NODE_ENV === 'test' ? '': ''}`,
        port: Number.parseInt(envVars.PGPORT, 2),
        logging: envVars.DATABASE_LOGGING,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    },
    production: {
        use_env_variable: "STAGING_URL",
        dialect: 'postgres'
    },
};
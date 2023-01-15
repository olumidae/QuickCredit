import joi from '@hapi/joi';

const loginRules = {
    email: joi.string().email({ tlds: { allow: false} }).empty().required(),
    password: joi.string().empty('').required()
}

const loginSchema = joi.object(loginRules);

export { loginSchema }
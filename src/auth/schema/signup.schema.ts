import joi from '@hapi/joi';

const signUp = {
    firstName: joi.string().empty('').required(),
    lastName: joi.string().empty('').required(),
    email: joi.string().email().empty('').required(),
    password: joi.string().empty('').required(),
    address: joi.string().empty('').required(),
}

const signUpSchema = joi.object(signUp);

export { signUpSchema }
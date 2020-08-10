import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();
const { secret } = process.env;
const expiryTime = 84600;

/**
 * @fileoverview function to generate token
 * @param {Object} userObject
 * @returns {Object} token
 * @exports generateToken
*/

const generateToken = ({ id, email, isAdmin }) => jwt.sign({ id, email, isAdmin }, secret, { expiresIn: expiryTime });

const decodedUser = token => jwt.verify(token, secret);

export { generateToken, decodedUser };

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { secret } = process.env;
const expiryTime = 84600;

/**
 * @fileoverview function to gen token
 * @param {Object} userObject
 * @returns {Object} token
 * @exports generateToken
*/

const generateToken = ({ id, email }) => jwt.sign({ id, email }, secret, { expiresIn: expiryTime });

export default generateToken;

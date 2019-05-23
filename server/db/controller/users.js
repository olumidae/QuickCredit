import webtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../db';

dotenv.config();
const { secret } = process.env;

const Users = {
  async signupUser(req, res) {
    const queryText = `INSERT INTO 
    users(firstName, lastName, email, password, address) 
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *`;

    const { firstName, lastName, email, password, address } = req.body;

    const hashPassword = await bcrypt.hash(password, 5);

    const values = [firstName, lastName, email, hashPassword, address];

    try {
      const { rows } = await db.query(queryText, values);

      const token = webtoken.sign({ email }, secret);

      return res.status(201).json({ 
        data: {
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
        },
        token,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async loginUser(req, res) {
 const { email, password }  = req.body;
 if (!email || !password) {
     res.status(400).json({
         error: 'Kindly enter your email and password!'
     })
 }
  },

  async getAllUsers(req, res) {
    const findAllQuery = 'SELECT * FROM users';

    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
}
  async getOneUser(req, res) {
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  verifyUser(email) {
    try {
      const queryText = "UPDATE users SET status='verified' WHERE email=$1";
      const response = db.query(queryText, [email]);
      return response;
    } catch (error) {
      console.log(error);
      return 'User already verified';
    }
  }
};

export default Users;

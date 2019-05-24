import webtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../db/db';
import authenticateUser from '../utils/authenticateUser';

dotenv.config();

const { secret } = process.env;

const UserController = {
  async getAllUsers(req, res) {
    const findAllQuery = 'SELECT * FROM users';

    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

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


  async verifyUser(req, res) {
    const { email } = req.params;
    const queryText = 'SELECT * FROM users WHERE email = $1';

    try {
      const { rows } = await db.query(queryText, [email]);
      if (!rows[0]) {
        return res.status(401).json({
          status: 400,
          error: 'User not found!',
        });
      }
      if (rows[0].status === 'verified') {
        return res.status(401).json({
          status: 401,
          error: 'User is already verified!',
        });
      }
      const updateOneQuery = "UPDATE users SET status = 'verified' WHERE email = $1 RETURNING *";

      const { rows: rowsUpdate } = await db.query(updateOneQuery, [email]);
      return res.status(201).json({
        status: 201,
        data: {
          email,
          firstName: rowsUpdate[0].firstName,
          lastName: rowsUpdate[0].lastName,
          address: rowsUpdate[0].address,
          status: rowsUpdate[0].status,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  },

  async logIn(req, res) {
    // Validating
    const { error } = authenticateUser.UserLoginValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }
    const queryText = 'SELECT * FROM users WHERE email = $1';

    const { email, password } = req.body;


    try {
      // Select all user record where email is equal to the email in the db
      const { rows } = await db.query(queryText, [email]);


      // check if user exist in database
      if (!rows[0].email) {
        res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });
      }


      const comparePassword = bcrypt.compareSync(password, rows[0].password);

      if (!comparePassword) {
        return res.status(401).json({
          status: 401,
          error: 'Password incorrect',
        });
      }
      const token = webtoken.sign({
        id: rows[0].id,
        email,
      }, secret);

      rows[0].isloggedin = true;
      return res
        .status(200)
        .json({
          status: 200,
          message: 'Logged In Successfully',
          data: {
            id: rows[0].id,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
            email: rows[0].email,
            address: rows[0].address,
            status: rows[0].status,
            isLoggedIn: rows[0].isloggedin,
            isAdmin: rows[0].isadmin,
          },
          token,
        });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  },

};

export default UserController;

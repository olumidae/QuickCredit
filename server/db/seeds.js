import bcrypt from 'bcrypt';
import pool from './db';


const insertUsers = `INSERT INTO users (firstName, lastName, email, password, address, status, isLoggedIn, isAdmin )
                    VALUES('Olumide', 'Omitiran', 'oomitiran@gmail.com', '${bcrypt.hashSync('password', 5)}', 'Lagos', 'verified', false, true)`;

const insertLoans = `INSERT INTO loans (userId, firstName, lastName, email, createdOn, amount, status, tenor, paymentInstallment, status, repaid, balance, interest)
VALUES (1, 'Olumide','Omitiran', 'oomitiran@gmail.com', ${Date()}, 100000, 6, 17500, 'approved', false, 52500, 5000)`;

// pool.query(insertUsers);
pool.query(insertLoans);

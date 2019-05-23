
import pool from './db';
/**
 * Create Tables
 */

const createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password  VARCHAR(500) NOT NULL,
  address TEXT NOT NULL,
  status VARCHAR(15) NOT NULL CHECK(status IN ('verified', 'unverified')) DEFAULT 'unverified',
  isLoggedIn BOOLEAN NOT NULL DEFAULT false,
  isAdmin BOOLEAN NOT NULL DEFAULT false
  )`;

const createLoanTable = `CREATE TABLE IF NOT EXISTS
  loans(
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(id) ON DELETE CASCADE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount MONEY NOT NULL,
  status VARCHAR(20) NOT NULL,
  repaid BOOLEAN NOT NULL,
  tenor  NUMERIC NOT NULL CHECK(1 >= tenor AND tenor <= 12),
  interest MONEY NOT NULL,
  paymentInstallment  MONEY NOT NULL,
  balance MONEY NOT NULL 
  )`;

const createRepayment = `CREATE TABLE IF NOT EXISTS
  repayments(
  id SERIAL NOT NULL PRIMARY KEY,
  loanId INT REFERENCES loans(id) ON DELETE CASCADE,
  createdOn TIMESTAMP NOT NULL,
  amount MONEY NOT NULL
  )`;

// pool.query(createUserTable);
pool.query(createLoanTable);
// pool.query(createRepayment);

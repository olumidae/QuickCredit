
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
  password  VARCHAR(50) NOT NULL,
  adddress TEXT NOT NULL,
  status VARCHAR(15) NOT NULL  NOT NULL CHECK(status IN ('verified', 'unverified')) DEFAULT 'unverified',
  isLoggedIn BOOLEAN NOT NULL DEFAULT false,
  isAdmin BOOLEAN NOT NULL DEFAULT false
  )`;

const createLoanTable = `CREATE TABLE IF NOT EXISTS
  loans(
  id SERIAL NOT NULL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  createdOn TIMESTAMPZ NOT NULL,
  amount VARCHAR(128) NOT NULL,
  status VARCHAR(128) NOT NULL,
  repaid VARCHAR(50) NOT NULL,
  tenor  NUMERIC NOT NULL CHECK(0 < tenor AND tenor <= 12),
  interest NUMERIC NOT NULL,
  paymentInstallment  NUMERIC NOT NULL,
  balance  NUMERIC NOT NULL 
  )`;

const createRepayment = `CREATE TABLE IF NOT EXISTS
  repayments(
  id SERIAL NOT NULL PRIMARY KEY,
  createdOn TIMESTAMPZ NOT NULL,
  loanId : INT NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  )`;

pool.query(createUserTable);
// db(createLoanTable);
// db(createRepayment);

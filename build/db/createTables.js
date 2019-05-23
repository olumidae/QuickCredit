'use strict';

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create Tables
 */

var createUserTable = 'CREATE TABLE IF NOT EXISTS\n  users(\n  id SERIAL PRIMARY KEY,\n  firstName VARCHAR(50) NOT NULL,\n  lastName VARCHAR(50) NOT NULL,\n  email VARCHAR(50) UNIQUE NOT NULL,\n  password  VARCHAR(500) NOT NULL,\n  address TEXT NOT NULL,\n  status VARCHAR(15) NOT NULL CHECK(status IN (\'verified\', \'unverified\')) DEFAULT \'unverified\',\n  isLoggedIn BOOLEAN NOT NULL DEFAULT false,\n  isAdmin BOOLEAN NOT NULL DEFAULT false\n  )';

var createLoanTable = 'CREATE TABLE IF NOT EXISTS\n  loans(\n  id SERIAL PRIMARY KEY,\n  userId INT REFERENCES users(id) ON DELETE CASCADE,\n  firstName VARCHAR(50) NOT NULL,\n  lastName VARCHAR(50) NOT NULL,\n  email VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,\n  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  amount MONEY NOT NULL,\n  status VARCHAR(20) NOT NULL,\n  repaid BOOLEAN NOT NULL,\n  tenor  NUMERIC NOT NULL CHECK(1 >= tenor AND tenor <= 12),\n  interest MONEY NOT NULL,\n  paymentInstallment  MONEY NOT NULL,\n  balance MONEY NOT NULL \n  )';

var createRepayment = 'CREATE TABLE IF NOT EXISTS\n  repayments(\n  id SERIAL NOT NULL PRIMARY KEY,\n  loanId INT REFERENCES loans(id) ON DELETE CASCADE,\n  createdOn TIMESTAMP NOT NULL,\n  amount MONEY NOT NULL\n  )';

// pool.query(createUserTable);
_db2.default.query(createLoanTable);
// pool.query(createRepayment);
import pool from './db';

const dropTables = 'DROP TABLE IF EXISTS users, loans, repayments CASCADE';
pool.query(dropTables);

import query from './db';

const dropTables = 'DROP TABLE IF EXISTS users, loans, repayments  CASCADE';
query(dropTables);

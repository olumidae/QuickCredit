'use strict';

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropTables = 'DROP TABLE IF EXISTS users, loans, repayments CASCADE';
_db2.default.query(dropTables);
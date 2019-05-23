'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertUsers = 'INSERT INTO users (firstName, lastName, email, password, address, status, isLoggedIn, isAdmin )\n                    VALUES(\'Olumide\', \'Omitiran\', \'oomitiran@gmail.com\', \'' + _bcrypt2.default.hashSync('password', 5) + '\', \'Lagos\', \'verified\', false, true)';

var insertLoans = 'INSERT INTO loans (userId, firstName, lastName, email, createdOn, amount, status, tenor, paymentInstallment, status, repaid, balance, interest)\nVALUES (1, \'Olumide\',\'Omitiran\', \'oomitiran@gmail.com\', ' + Date() + ', 100000, 6, 17500, \'approved\', false, 52500, 5000)';

// pool.query(insertUsers);
_db2.default.query(insertLoans);
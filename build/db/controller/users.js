'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _authenticateUser = require('../../utils/authenticateUser');

var _authenticateUser2 = _interopRequireDefault(_authenticateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var secret = process.env.secret;


var Users = {
  signupUser: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var queryText, _req$body, firstName, lastName, email, password, address, hashPassword, values, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              queryText = 'INSERT INTO \n    users(firstName, lastName, email, password, address) \n    VALUES($1, $2, $3, $4, $5) \n    RETURNING *';
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, address = _req$body.address;
              _context.next = 4;
              return _bcrypt2.default.hash(password, 5);

            case 4:
              hashPassword = _context.sent;
              values = [firstName, lastName, email, hashPassword, address];
              _context.prev = 6;
              _context.next = 9;
              return _db2.default.query(queryText, values);

            case 9:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              token = _jsonwebtoken2.default.sign({ email: email }, secret);
              return _context.abrupt('return', res.status(201).json({
                data: {
                  id: rows[0].id,
                  firstName: rows[0].firstname,
                  lastName: rows[0].lastname,
                  email: rows[0].email
                },
                token: token
              }));

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](6);
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 15]]);
    }));

    function signupUser(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return signupUser;
  }(),
  logIn: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var queryText, _req$body2, email, password, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Validating
              // const { error } = authenticateUser.UserLoginValidator(req.body);
              //  let token;
              // if (error) {
              //   return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
              // }
              queryText = 'SELECT * FROM users WHERE email = $1';
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.prev = 2;
              _context2.next = 5;
              return _db2.default.query(queryText, [email]);

            case 5:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt('return', res.status(404).json({
                status: 404,
                error: 'User not Found'
              }));

            case 9:
              _bcrypt2.default.compare(password !== rows[0].password, function () {
                if (!res) {
                  return res.status(401).json({
                    status: 401,
                    error: 'Email/Password incorrect'
                  });
                }
                var token = _jsonwebtoken2.default.sign({
                  id: rows[0].id,
                  isadmin: rows[0].isadmin,
                  email: email
                }, secret);
                return res.status(201).json({
                  data: {
                    id: rows[0].id,
                    firstName: rows[0].firstname,
                    lastName: rows[0].lastname,
                    email: rows[0].email
                  },
                  token: token
                });
              });
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](2);
              return _context2.abrupt('return', res.status(500).json({
                status: 500,
                error: 'Internal server error ' + error.message
              }));

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 12]]);
    }));

    function logIn(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return logIn;
  }(),
  getAllUsers: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var findAllQuery, _ref6, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findAllQuery = 'SELECT * FROM users';
              _context3.prev = 1;
              _context3.next = 4;
              return _db2.default.query(findAllQuery);

            case 4:
              _ref6 = _context3.sent;
              rows = _ref6.rows;
              rowCount = _ref6.rowCount;
              return _context3.abrupt('return', res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](1);
              return _context3.abrupt('return', res.status(400).send(_context3.t0));

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 10]]);
    }));

    function getAllUsers(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return getAllUsers;
  }(),
  getOneUser: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var text, _ref8, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'SELECT * FROM users WHERE id = $1';
              _context4.prev = 1;
              _context4.next = 4;
              return _db2.default.query(text, [req.params.id]);

            case 4:
              _ref8 = _context4.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt('return', res.status(404).send({ message: 'user not found' }));

            case 8:
              return _context4.abrupt('return', res.status(200).send(rows[0]));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](1);
              return _context4.abrupt('return', res.status(400).send(_context4.t0));

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 11]]);
    }));

    function getOneUser(_x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return getOneUser;
  }(),
  verifyUser: function verifyUser(email) {
    try {
      var queryText = "UPDATE users SET status='verified' WHERE email=$1";
      var response = _db2.default.query(queryText, [email]);
      return response;
    } catch (error) {
      console.log(error);
      return 'User already verified';
    }
  }
};

exports.default = Users;
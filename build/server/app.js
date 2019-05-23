'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db/db');

var _db2 = _interopRequireDefault(_db);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// endpoints
app.use('/api/v1', _routes2.default);

// Routes
// app.use('/', (req, res) => {
//   res.send({ message: 'Welcome to the homepage' });
// });

var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server Running on ' + PORT + '!!!'));

exports.default = app;
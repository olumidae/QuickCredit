'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('Apply for new loan', function () {
  it('checks clients login status', function (done) {
    var email = 'oomitiran@gmail.com';
    var isLoggedIn = 'false';

    _chai2.default.request(_app2.default).post('/api/v1/loans/').send({
      email: 'oomitiran@gmail.com',
      isLoggedIn: ''
    }).end(function (err, res) {
      // console.log(res);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('Denies user new loan if theres a pending loan', function () {
    _chai2.default.request(_app2.default).post('/api/v1/loans/').send({
      email: 'oomitiran@gmail.com',
      tenor: 8,
      amount: '50000'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });

  it('All fields are required', function () {
    _chai2.default.request(_app2.default).post('/api/v1/loans/').send({
      user: '',
      tenor: '',
      amount: ''
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
});

describe('Get all loans', function () {
  it('return no loans', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/loans/').end(function (err, res) {
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
  });
});
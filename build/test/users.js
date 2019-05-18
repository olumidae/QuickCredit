'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect; /* eslint-disable no-undef */

_chai2.default.use(_chaiHttp2.default);

describe('Register new user', function () {
  it('Lets new user register', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'olumide',
      lastName: 'omitiran',
      email: 'oomitiran@gmail.com',
      address: 'lagos',
      password: '12345678',
      isAdmin: 'true'
    }).end(function (err, res) {
      // console.log(res.body)
      expect(res.body.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('isAdmin property should be a boolean', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({

      isAdmin: 'admin'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('All input fields are required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      password: ''
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('Checks if email exists', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').set('Content-type', 'application/json').set('Accept', 'application/json').send({
      firstName: 'Eden',
      lastName: 'Hazard',
      email: 'ehazard@gmail.com',
      password: 'ehazard10'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
  });
});

// describe('Login', () => {
//   it('Lets new and existing users login', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/logIn')
//       .send({
//         email: 'oomitiran@gmail.com',
//         password: 'supersecret',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.equal(200);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('data');
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });

//   it('All fields are required', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/logIn')
//       .send({
//         email: '',
//         password: '',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.equal(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });


//   it('Incorrect Password', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/logIn')
//       .send({
//         email: 'oomitiran@gmail.com',
//         password: 'secret',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.equal(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });
// });
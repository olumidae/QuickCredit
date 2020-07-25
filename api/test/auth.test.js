import chai from 'chai';
import { before, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import adminUsers from '../seed-data/adminUsers';
import users from '../seed-data/users';

const { expect } = chai;
chai.use(chaiHttp);
const baseurl = '/api/v1/';
let adminToken;

// const payload = {
//   ...adminUsers[1], password: ''
// }

describe('User Authorization', () => {
  before((done) => {
    chai.request(app)
      .post(`${baseurl}/auth/login`)
      .send({
        email: adminUsers[0].email,
        password: 'password@123',
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        adminToken = res.body.data.token;
        done();
      });
  });

  it('Lets new user register', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Adamu',
        lastName: 'omitiran',
        email: 'oomitiran@gmail.com',
        address: 'lagos',
        password: 'password@123',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('isAdmin property should be a boolean', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({

        isAdmin: 'admin',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('All input fields are required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Checks if email exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        firstName: 'Olumide',
        lastName: 'Omitiran',
        email: 'oomitiran@gmail.com',
        password: 'password@123',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('Login', () => {
  it('Lets new and existing users login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'oomitiran@gmail.com',
        password: 'password@123',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('All fields are required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });


  it('Incorrect Password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'oomitiran@gmail.com',
        password: 'secret',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);


describe('Apply for new loan', () => {
  it('checks clients login status', (done) => {
    let email = 'oomitiran@gmail.com';
    let isLoggedIn = 'false';

    chai
      .request(app)
      .post('/api/v1/loans/')
      .send({
        email: 'oomitiran@gmail.com',
        isLoggedIn: '',
      })
      .end((err, res) => {
        // console.log(res);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Denies user new loan if theres a pending loan', () => {
    chai.request(app)
      .post('/api/v1/loans/')
      .send({
        email: 'oomitiran@gmail.com',
        tenor: 8,
        amount: '50000',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });

  it('All fields are required', () => {
    chai.request(app)
      .post('/api/v1/loans/')
      .send({
        user: '',
        tenor: '',
        amount: '',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
});

describe('Get all loans', () => {
  it('return no loans', (done) => {
    chai.request(app)
      .get('/api/v1/loans/')
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

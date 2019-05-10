import chai from 'chai';
import http from 'chai-http';
import app from '../app';
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(http);


describe('App basic test', () => {
  // eslint-disable-next-line no-undef
  it('Should exist and must be a function', (done) => {
    expect(app).to.be.a('function');
    done();
  });

  // eslint-disable-next-line no-undef
  it('GET / should return 200 and message', (done) => {
    // send request to the app
    chai.request(app).get('/api/v1')
      .then((res) => {
        // assertions
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.message).to.contain('Welcome to the homepage');
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});


// eslint-disable-next-line no-undef
// describe('User registration', () => {
//   // eslint-disable-next-line no-undef
//   it('Should return 201 and confirmation for valid input', (done) => {
//     // mock valid user input
//     const user = {
//       fistname: 'Olumide',
//       lastname: 'Omitiran',
//       email: 'oomitiran@gmail.com',
//       password: 'supersecret',
//     };
//     // send /POST request to  /auth/signup
//     chai.request(app).post('/auth/signup')
//       .send(user)
//       .end((err, res) => {
//         // assertions
//         res.should.have.status(201);
//         res.body.should.equal('User registered');
//         // expect(res.body.errors.length).to.be.equal(1);
//         done();
//       });
//   });

//   // eslint-disable-next-line no-undef
//   it('/register should return 401 for invalid input', (done) => {
//     // mock invalid user input
//     const user = {
//       fistname: 'Olumide',
//       lastname: 'Omitiran',
//       email: 'oomitiran@gmail.com',
//       password: 'supersecret',
//     };
//     // send /POST request to /auth/signup
//     chai.request(app).post('/auth/signup')
//       .send(user).then((res) => {
//         // validate
//         expect(res).to.have.status(401);
//         expect(res.body.errors.length).to.be.equal(1);

//         // done after all assertions pass
//         done();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// });

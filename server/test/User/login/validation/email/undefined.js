import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/login', () => {
  it('should respond with an error if the email field is undefined', (done) => {
    const loginDetails = {
      password: 'encryptedpassword',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email');
        res.body.errors.email.should.be.a('string');
        res.body.errors.email.should.eql('Email field is required');
        done();
      });
  });
});

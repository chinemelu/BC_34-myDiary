import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  it('should respond with an error if the email field is undefined', (done) => {
    const registrationDetails = {
      password: 'superstrongpassword',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email');
        res.body.errors.email.should.be.a('string');
        res.body.errors.email.should.eql('Email field must not be empty');
        done();
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/login', () => {
  it('should respond with an error if the password field is undefined', (done) => {
    const loginDetails = {
      email: 'teejay2k4@yahoo.com',
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
        res.body.errors.should.have.property('password');
        res.body.errors.password.should.be.a('string');
        res.body.errors.password.should.eql('Password field is required');
        done();
      });
  });
});

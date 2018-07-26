import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';


chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  it('should respond with an error if paswword is wrong', (done) => {
    const registrationDetails = {
      username: 'teejay2k4',
      email: 'teejay2k4@yahoo.com',
      password: 'iAMAwesome'
    };
    const loginDetails = {
      email: 'teejay2k4@yahoo.com',
      password: 'iAMAwesom' // wrong password
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end(() => {
        chai.request(server)
          .post('/api/v1/auth/login')
          .send(loginDetails)
          .end((err, res) => {
            res.should.have.status(401);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('email or password is incorrect');
            done();
          });
      });
  });
});

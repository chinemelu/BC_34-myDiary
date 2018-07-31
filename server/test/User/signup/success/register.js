import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';


chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  it('should register a user if there are no validation errors', (done) => {
    const registrationDetails = {
      username: 'teejay2k4',
      email: 'teejay2k4@yahoo.com',
      password: 'iAMAwesome'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.username.should.be.a('string');
        res.body.username.should.eql('teejay2k4');
        res.body.email.should.eql('teejay2k4@yahoo.com');
        res.body.should.have.property('token');
        res.body.should.have.property('message');
        res.body.message.should.eql('teejay2k4, you have successfully created an account');
        done();
      });
  });
});

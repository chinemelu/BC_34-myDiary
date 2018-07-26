import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  it('should respond with an error if the username field contains more than 15 characters', (done) => {
    const registrationDetails = {
      username: 'Anthony123456789',
      email: 'teejay2k4@yahoo.com',
      password: 'iAMAwesome'
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
        res.body.errors.should.have.property('username');
        res.body.errors.username.should.be.a('string');
        res.body.errors.username.should.eql('Username must have a minimum length of 4 characters and a maximum \n'
        + 'length of 15 characters');
        done();
      });
  });
});

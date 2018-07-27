import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries', () => {
  it('should throw an error if an invalid token is provided', (done) => {
    const registrationDetails = {
      username: 'invalidTokenGET',
      password: 'testPassword',
      email: 'invalidTokenProvidedGET@test.com'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('token');
        const token = `${res.body.token} c`; // concatenate an extra letter to make token invalid
        chai.request(server)
          .get('/api/v1/entries')
          .set('token', token)
          .end((err, res) => {
            res.should.have.status(401);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('Invalid token');
            done();
          });
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries/<entryId>', () => {
  it('should throw an error if an invalid token is provided', (done) => {
    const registrationDetails = {
      username: 'invaldiGETentry',
      password: 'testPassword',
      email: 'invalidGETentry@test.com'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('token');
        const token = `${res.body.token} 2`; // concatenate an extra number to make token invalid
        chai.request(server)
          .get('/api/v1/entries/555a5728-677a-4056-b7fc-bad11eb6e822') // unlikely UUID
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

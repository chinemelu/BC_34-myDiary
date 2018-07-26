import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/entries', () => {
  it('should throw an error if an invalid token is provided', (done) => {
    const registrationDetails = {
      username: 'invalidToken',
      password: 'testPassword',
      email: 'invalidTokenProvided@test.com'
    };
    const diaryEntry = {
      title: 'A boy has no name',
      description: 'Game of Thrones reference',
      privacy: 'private'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('token');
        const token = `${res.body.token} 2`; // concatenate an extra number to make token invalid
        chai.request(server)
          .post('/api/v1/entries')
          .set('token', token)
          .send(diaryEntry)
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

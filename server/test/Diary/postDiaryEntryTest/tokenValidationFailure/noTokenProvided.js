import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/entries', () => {
  it("should throw an error if there's no token provided", (done) => {
    const registrationDetails = {
      username: 'NoTokenProvided',
      password: 'testPassword',
      email: 'testNoTokenProvided@test.com'
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
        const token = ''; // token is set to  null here
        chai.request(server)
          .post('/api/v1/entries')
          .set('token', token)
          .send(diaryEntry)
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.eql('false');
            res.body.should.have.property('message');
            res.body.message.should.eql('No token provided');
            done();
          });
      });
  });
});

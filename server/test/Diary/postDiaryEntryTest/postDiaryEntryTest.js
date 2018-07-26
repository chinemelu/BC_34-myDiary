import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/entries', () => {
  it('should add a SINGLE diary entry when there are no errors', (done) => {
    const registrationDetails = {
      username: 'testUsername',
      password: 'testPassword',
      email: 'testEmail@test.com'
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
        const { token } = res.body;
        chai.request(server)
          .post('/api/v1/entries')
          .set('token', token)
          .send(diaryEntry)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('You have successfully posted the diary entry');
            res.body.should.have.property('data');
            res.body.data.should.have.property('title');
            res.body.data.title.should.be.a('string');
            res.body.data.title.should.eql('A boy has no name');
            res.body.data.should.have.property('description');
            res.body.data.description.should.be.a('string');
            res.body.data.description.should.eql('Game of Thrones reference');
            res.body.data.should.have.property('privacy');
            res.body.data.privacy.should.be.a('string');
            res.body.data.privacy.should.eql('private');
            done();
          });
      });
  });
});

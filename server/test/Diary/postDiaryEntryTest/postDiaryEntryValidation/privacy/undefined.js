import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/entries', () => {
  it("should have a default privacy value of 'private' when the privacy input field is undefined", (done) => {
    const registrationDetails = {
      username: 'undefined',
      password: 'testPassword',
      email: 'undefined@test.com'
    };
    const diaryEntry = {
      title: 'A boy has no name',
      description: 'Game of Thrones reference',
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
          .send(diaryEntry)
          .set('token', token)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('privacy');
            res.body.data.privacy.should.eql('private');
            done();
          });
      });
  });
});

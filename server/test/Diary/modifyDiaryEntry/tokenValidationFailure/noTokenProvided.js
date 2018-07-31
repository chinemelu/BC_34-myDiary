import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/entries/<entryId>', () => {
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
        let token = `${res.body.token}`; // concatenate an extra number to make token invalid
        chai.request(server)
          .post('/api/v1/entries')
          .set('token', token)
          .send(diaryEntry)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('Invalid token');
            token = ''; // set token to empty string
            chai.request(server)
              .put(`/api/v1/entries/${res.body.data[0].id}`)
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
});

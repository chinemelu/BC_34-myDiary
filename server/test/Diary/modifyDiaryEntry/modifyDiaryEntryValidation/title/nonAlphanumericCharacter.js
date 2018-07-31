import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/entries/<entry Id>', () => {
  it('it should respond with an error message if title field has characters that aren\'t alphanumeric', (done) => {
    const updatedDiaryEntry = {
      title: 'A boy ? no name',
      description: 'Boom',
      privacy: 'private'
    };
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
        const token = `${res.body.token}`;
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
            console.log("RESPONSE", res)
            chai.request(server)
              .put(`/api/v1/entries/${res.body.data[0].id}`)
              .set('token', token)
              .send(updatedDiaryEntry)
              .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('object');
                res.body.errors.title.should.eql('Title should consist of only alphanumeric characters');
                done();
              });
          });
      });
  });
});

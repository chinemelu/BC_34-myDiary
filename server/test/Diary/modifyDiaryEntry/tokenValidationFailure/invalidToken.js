import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT /api/v1/entries/<entryId>', () => {
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
            token = `${res.body.token} 2`; // concatenate an extra number to make token invalid
            console.log("RESPONSE", res)
            chai.request(server)
              .put(`/api/v1/entries/${res.body.data[0].id}`)
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
});

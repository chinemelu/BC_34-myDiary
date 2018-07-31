import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries/<entry id>', () => {
  it('it should respond with an error message if id is not a UUID', (done) => {
    const registrationDetails = {
      username: 'ultraNewUser',
      email: 'ultraNewEmail@yahoo.com',
      password: 'iAMAwesome'
    };
    const diaryEntry = {
      title: 'A savage man on Twitter',
      description: 'Piers Morgan',
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
          .send(diaryEntry)
          .set('token', token)
          .end((err, res) => {
            res.should.have.status(201);
            chai.request(server)
              .get('/api/v1/entries/a')
              .set('token', token)
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('string');
                res.body.errors.should.eql('Invalid Id');
                done();
              });
          });
      });
  });
});

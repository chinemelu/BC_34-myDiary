import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries/<entry id>', () => {
  it('should get a 404 not found status message if entry does not exist', (done) => {
    const registrationDetails = {
      username: 'notFoundrname',
      email: 'notFoundEmail@yahoo.com',
      password: 'iAMAwesome'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('token');
        const { token } = res.body;
        chai.request(server) // put unlikely UUID
          .get('/api/v1/entries/888a8888-888a-4056-b8fc-bad88eb6e888')
          .set('token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            res.body.message.should.eql('Diary entry not found');
            done();
          });
      });
  });
});

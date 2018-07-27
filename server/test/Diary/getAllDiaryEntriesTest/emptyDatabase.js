import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries', () => {
  it("should indicate if there's no diary entry for a particular user", (done) => {
    const registrationDetails = {
      username: 'emptyDatabase',
      password: 'testPassword',
      email: 'emptyDatabase@test.com'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('token');
        const { token } = res.body;
        chai.request(server)
          .get('/api/v1/entries')
          .set('token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('There are no available diary entries');
            done();
          });
      });
  });
});

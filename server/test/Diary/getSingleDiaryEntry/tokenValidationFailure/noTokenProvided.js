import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries/<entryId>', () => {
  it("should throw an error if there's no token provided", (done) => {
    const registrationDetails = {
      username: 'extremeDiff',
      password: 'testPassword',
      email: 'extremeDiffT@test.com'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('token');
        const token = ''; // token is set to  null here
        chai.request(server)
          .get('/api/v1/entries/1e97d495-6dd6-4d53-8533-56800e22a6ce')
          .set('token', token)
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

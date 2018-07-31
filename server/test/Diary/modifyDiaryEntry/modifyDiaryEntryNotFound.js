import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/entries/<entry id>', () => {
  it('should get a 404 not found status message if entry does not exist', (done) => {
    const registrationDetails = {
      username: 'test1',
      email: 'test1@yahoo.com',
      password: 'iAMAwesome'
    };
    const entry = {
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
          .send(entry)
          .set('token', token)
          .end((err, res) => {
            res.should.have.status(201);
            chai.request(server)
              // add random unlikely UUID
              .put('/api/v1/entries/8fff7a77-7d7d-77e1-a888-10d8888888d8')
              .send(entry)
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
});

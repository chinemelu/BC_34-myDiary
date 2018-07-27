import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries/<entry id>', () => {
  it('it should list a single diary entry if database table has the entry', (done) => {
    const registrationDetails = {
      username: 'newUsername',
      email: 'newEmail@yahoo.com',
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
              .get(`/api/v1/entries/${res.body.data.id}`)
              .set('token', token)
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('title');
                res.body.data.title.should.eql('A savage man on Twitter');
                res.body.data.should.have.property('description');
                res.body.data.description.should.eql('Piers Morgan');
                res.body.data.should.have.property('privacy');
                res.body.data.privacy.should.eql('private');
                done();
              });
          });
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries', () => {
  it('it should list all diary entries if database table has an entry', (done) => {
    const signupDetails1 = {
      username: 'getAllEntries',
      password: 'testPassword',
      email: 'getAllEntries@test.com'
    };
    const diaryEntry = {
      title: 'getAllDiaryEntries',
      description: 'I am getting all my entries',
      privacy: 'public'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(signupDetails1)
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
              .get('/api/v1/entries')
              .set('token', token)
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('title');
                res.body.data[0].should.have.property('description');
                res.body.data[0].should.have.property('privacy');
                done();
              });
          });
      });
  });
});

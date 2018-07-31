import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);
describe('PUT: /api/v1/entries/<entry id>', () => {
  it('it should respond with an error message if id is not a UUID', (done) => {
    const diaryEntry = {
      title: 'update title 1',
      description: 'update description 1',
      privacy: 'public'
    };
    const userRegDetails = {
      username: 'Tony',
      password: 'testpasswod',
      email: 'tonyboy100@gmail.com'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userRegDetails)
      .end((err, res) => {
        const { token } = res.body;
        res.should.have.status(201);
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
                chai.request(server)
                  .put('/api/v1/entries/a')
                  .send(diaryEntry)
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
});

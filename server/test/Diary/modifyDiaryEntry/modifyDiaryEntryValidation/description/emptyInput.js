import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/entries', () => {
  it('it should respond with an error message if description field is empty', (done) => {
    const diaryEntry = {
      title: 'A boy has no name',
      description: '',
      privacy: 'public'
    };
    const initialEntry = {
      title: 'modifyTitle1',
      description: 'modDescrpt1',
      privacy: 'public'
    };
    const registrationDetails = {
      username: 'modifyTest1',
      email: 'modifyTest1@yahoo.com',
      password: 'iAMAwesome'
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
          .send(initialEntry)
          .set('token', token)
          .end((err, res) => {
            chai.request(server)
              .put(`/api/v1/entries/${res.body.data[0].id}`)
              .send(diaryEntry)
              .set('token', token)
              .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('object');
                res.body.errors.description.should.eql('Description field is required');
                done();
              });
          });
      });
  });
});

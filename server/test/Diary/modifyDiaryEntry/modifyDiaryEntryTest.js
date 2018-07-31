import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/entries/<entry Id>', () => {
  it('it should modify a diary entry if there are no errors', (done) => {
    const initialEntry = {
      title: 'modifyTitle1',
      description: 'modDescrpt1',
      privacy: 'public'
    };
    const updatedDiaryEntry = {
      title: 'A girl has no name',
      description: 'Arya Stark is a boss lady',
      privacy: 'private'
    };
    const signupDetails4 = {
      username: 'modifyTest1',
      email: 'modifyTest1@yahoo.com',
      password: 'iAMAwesome'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(signupDetails4)
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
              .send(updatedDiaryEntry)
              .set('token', token)
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.a.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.eql('You have successfully updated the diary entry');
                res.body.should.have.property('updated');
                res.body.updated.should.be.a('object');
                res.body.updated.title.should.eql('A girl has no name');
                res.body.updated.description.should.eql('Arya Stark is a boss lady');
                res.body.updated.privacy.should.eql('private');
                done();
              });
          });
      });
  });
});

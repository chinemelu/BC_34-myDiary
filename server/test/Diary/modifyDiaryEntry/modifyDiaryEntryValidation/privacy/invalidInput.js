import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);
describe('PUT: /api/v1/entries/<entry Id>', () => {
  it('it should respond with an error message if privacy value other than private or public is inputted', (done) => {
    const diaryEntry = {
      title: 'A boy has no name',
      description: 'Game of Thrones reference',
      privacy: 'not-private'
    };
    chai.request(server)
      .get('/api/v1/entries')
      .send(diaryEntry)
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/entries/${res.body.data[0].id}`)
          .send(diaryEntry)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.be.a('object');
            res.body.errors.privacy.should.eql('Please enter private or public');
            done();
          });
      });
  });
});

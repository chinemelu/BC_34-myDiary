import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/entries/<entry Id>', () => {
  it('it should respond with an error message if title field is empty', (done) => {
    const diaryEntry = {
      title: '',
      description: 'update description 1',
      privacy: 'public'
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
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.be.a('object');
            res.body.errors.should.have.property('title');
            res.body.errors.title.should.be.a('string');
            res.body.errors.title.should.eql('Title field is required');
            done();
          });
      });
  });
});

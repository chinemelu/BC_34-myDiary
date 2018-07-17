import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('diary entries', () => {
  describe('PUT: /api/v1/entries/<entry Id>', () => {
    it('it should respond with an error message if title field is empty', (done) => {
      const diaryEntry = {
        title: 'update title 1',
        description: 'update description 1',
        privacy: 'public'
      };
      chai.request(server)
        .get('/api/v1/entries/1')
        .end(() => {
          chai.request(server)
            .put('/api/v1/entries/1')
            .send(diaryEntry)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.title.should.eql('update title 1');
              res.body.data.description.should.eql('update description 1');
              res.body.data.privacy.should.eql('public');
              done();
            });
        });
    });
  });
});

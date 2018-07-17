import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);
describe('diary entries', () => {
  describe('PUT: /api/v1/entries/<entry Id>', () => {
    it('it should respond with an error message if title field has characters that aren\'t alphanumeric', (done) => {
      const diaryEntry = {
        title: 'A girl has no name',
        description: 'Arya Stark is a boss lady',
        privacy: 'private'
      };
      chai.request(server)
        .put('/api/v1/entries/1')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.a.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('You have successfully updated the diary entry');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.title.should.eql('A girl has no name');
          res.body.data.description.should.eql('Arya Stark is a boss lady');
          res.body.data.privacy.should.eql('private');
          done();
        });
    });
  });
});

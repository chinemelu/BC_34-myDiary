import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('diary entries', () => {
  describe('POST: /api/v1/entries', () => {
    it('it should respond with an error message if privacy value other than private or public is inputted', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Game of Thrones reference',
        privacy: 'not-private'
      };
      chai.request(server)
        .post('/api/v1/entries')
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
    it('should have a default privacy value of \'private\' when the privacy input field is empty', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Game of Thrones reference',
        privacy: ''
      };
      chai.request(server)
        .post('/api/v1/entries')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('privacy');
          res.body.data.privacy.should.eql('private');
          done();
        });
    });
  });
});

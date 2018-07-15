import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('diary entries', () => {
  describe('POST: /api/v1/entries', () => {
    it('it should respond with an error message if title field is empty', (done) => {
      const diaryEntry = {
        title: '',
        description: 'Booyah',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/entries')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.title.should.eql('Title field is required');
          done();
        });
    });
    it('it should respond with an error message if title field has fewer than 4 characters', (done) => {
      const diaryEntry = {
        title: 'blo',
        description: 'Boom',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/entries')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.title.should.eql('Title must have a minimum length of 4 characters and a maximum \n'
          + 'length of 70 characters');
          done();
        });
    });
    it('it should respond with an error message if title field has characters that aren\'t alphanumeric', (done) => {
      const diaryEntry = {
        title: 'A boy ? no name',
        description: 'Boom',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/entries')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.title.should.eql('Title should consist of only alphanumeric characters');
          done();
        });
    });
  });
});

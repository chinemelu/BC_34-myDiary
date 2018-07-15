import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('diary entries', () => {
  describe('POST: /api/v1/entries', () => {
    it('it should respond with an error message if description field is empty', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: '',
        privacy: 'public'
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
          res.body.errors.description.should.eql('Description field is required');
          done();
        });
    });
    it('it should respond with an error message if description field has no alphabet', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: '123',
        privacy: 'public'
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
          res.body.errors.description.should.eql('Description must consist of alphanumeric \n'
          + 'characters and special characters (? - , . ), and it must include at \n'
          + 'least one alphabet');
          done();
        });
    });
    it('it should respond with an error message if description field consists of forbidden special characters', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Anthony is my name &',
        privacy: 'public'
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
          res.body.errors.description.should.eql('Description must consist of alphanumeric \n'
          + 'characters and special characters (? - , . ), and it must include at \n'
          + 'least one alphabet');
          done();
        });
    });
    it('it should respond with an error message if description field has fewer than 4 character', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Ant',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/entries')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.description.should.eql('Description must have a minimum length of 4 characters');
          done();
        });
    });
  });
});

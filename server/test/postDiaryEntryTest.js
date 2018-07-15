import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

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
          res.body.title.should.eql('Title field is required');
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
          res.body.title.should.eql('Title must have a minimum length of 4 characters and a maximum \n'
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
          res.body.title.should.eql('Title should consist of only alphanumeric characters');
          done();
        });
    });
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
          res.body.description.should.eql('Description field is required');
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
          res.body.description.should.eql('Description must consist of alphanumeric \n'
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
          res.body.description.should.eql('Description must consist of alphanumeric \n'
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
          res.body.description.should.eql('Description must have a minimum length of 4 characters');
          done();
        });
    });
    it('should add a SINGLE diary entry when there are no errors', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Game of Thrones reference',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/entries')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('title');
          res.body.data.title.should.be.a('string');
          res.body.data.title.should.eql('A boy has no name');
          res.body.data.should.have.property('description');
          res.body.data.description.should.be.a('string');
          res.body.data.description.should.eql('Game of Thrones reference');
          res.body.data.should.have.property('privacy');
          res.body.data.privacy.should.be.a('string');
          res.body.data.privacy.should.eql('private');
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

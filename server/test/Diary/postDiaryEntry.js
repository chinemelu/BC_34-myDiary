import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/db';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/entries API route', () => {
  before((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  before((done) => {
    db('DELETE FROM entries', () => {
      done();
    });
  });
  describe('Validation Errors', () => {
    it('should respond with an error message if title field is undefined', (done) => {
      const diaryEntry = {
        description: 'update description 1',
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
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.be.a('string');
          res.body.errors.title.should.eql('Title field is required');
          done();
        });
    });
    it('should respond with an error message if title field is empty', (done) => {
      const diaryEntry = {
        title: '',
        description: 'update description 1',
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
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.be.a('string');
          res.body.errors.title.should.eql('Title field is required');
          done();
        });
    });
    it('should respond with an error message if title field has characters that aren\'t alphanumeric', (done) => {
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
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.be.a('string');
          res.body.errors.title.should.eql('Title should consist of only alphanumeric characters');
          done();
        });
    });
    it('should respond with an error message if title field has fewer than 4 characters', (done) => {
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
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.be.a('string');
          res.body.errors.title.should.eql('Title must have a minimum length of 4 characters and a maximum \n'
          + 'length of 70 characters');
          done();
        });
    });
    it('should respond with an error message if description field is undefined', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
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
          res.body.errors.should.have.property('description');
          res.body.errors.description.should.be.a('string');
          res.body.errors.description.should.eql('Description field is required');
          done();
        });
    });
    it('should respond with an error message if description field is empty', (done) => {
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
          res.body.errors.should.have.property('description');
          res.body.errors.description.should.be.a('string');
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
    it('should respond with an error message if description field consists of forbidden special characters', (done) => {
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
    it('should respond with an error message if description field has fewer than 4 characters', (done) => {
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
    it("should have a default privacy value of 'private' when the privacy input field is undefined", (done) => {
      const registrationDetails = {
        username: 'undefined',
        password: 'testPassword',
        email: 'undefined@test.com'
      };
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Game of Thrones reference',
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
            .send(diaryEntry)
            .set('token', token)
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
    it('should respond with an error message if privacy value other than private or public is inputted', (done) => {
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
    describe('Default values', () => {
      it("should have a default privacy value of 'private' when the privacy input field is empty", (done) => {
        const registrationDetails = {
          username: 'emptyPrivacy',
          password: 'testPassword',
          email: 'emptyPrivacy@test.com'
        };
        const diaryEntry = {
          title: 'A boy has no name',
          description: 'Game of Thrones reference',
          privacy: ''
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
              .set('token', token)
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
      it("should respond with an error message if privacy input values other than 'private' or 'public' are inputted", (done) => {
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
    });
    describe('Authentication errors', () => {
      it("should throw an error if there's no token provided", (done) => {
        const registrationDetails = {
          username: 'NoTokenProvided',
          password: 'testPassword',
          email: 'testNoTokenProvided@test.com'
        };
        const diaryEntry = {
          title: 'A boy has no name',
          description: 'Game of Thrones reference',
          privacy: 'private'
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(registrationDetails)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('token');
            const token = '';
            chai.request(server)
              .post('/api/v1/entries')
              .set('token', token)
              .send(diaryEntry)
              .end((err, res) => {
                res.should.have.status(403);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.eql('false');
                res.body.should.have.property('message');
                res.body.message.should.eql('No token provided');
                done();
              });
          });
      });
      it('should throw an error if an invalid token is provided', (done) => {
        const registrationDetails = {
          username: 'invalidToken',
          password: 'testPassword',
          email: 'invalidTokenProvided@test.com'
        };
        const diaryEntry = {
          title: 'A boy has no name',
          description: 'Game of Thrones reference',
          privacy: 'private'
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(registrationDetails)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('token');
            const token = `${res.body.token} 2`;
            chai.request(server)
              .post('/api/v1/entries')
              .set('token', token)
              .send(diaryEntry)
              .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.eql('Invalid token');
                done();
              });
          });
      });
    });
    describe('Post diary entry success', () => {
      it('should add a SINGLE diary entry when there are no errors', (done) => {
        const registrationDetails = {
          username: 'testUsername',
          password: 'testPassword',
          email: 'testEmail@test.com'
        };
        const diaryEntry = {
          title: 'A boy has no name',
          description: 'Game of Thrones reference',
          privacy: 'private'
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
              .set('token', token)
              .send(diaryEntry)
              .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.eql('You have successfully posted the diary entry');
                res.body.should.have.property('data');
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
      });
    });
  });
});

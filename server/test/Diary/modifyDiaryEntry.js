import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/entries/<entry Id> API route', () => {
  beforeEach((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE FROM entries', () => {
      done();
    });
  });
  describe('Validation errors', () => {
    it('it should respond with an error message if id is not a UUID', (done) => {
      const diaryEntry = {
        title: 'update title 1',
        description: 'update description 1',
        privacy: 'public'
      };
      const userRegDetails = {
        username: 'Tony',
        password: 'testpasswod',
        email: 'tonyboy100@gmail.com'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegDetails)
        .end((err, res) => {
          const { token } = res.body;
          res.should.have.status(201);
          chai.request(server)
            .post('/api/v1/entries')
            .send(diaryEntry)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(201);
              chai.request(server)
                .get('/api/v1/entries')
                .set('token', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  chai.request(server)
                    .put(`/api/v1/entries/${res.body.data.id} a`)
                    .set('token', token)
                    .send(diaryEntry)
                    .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.be.a('object');
                      res.body.should.have.property('errors');
                      res.body.errors.should.be.a('string');
                      res.body.errors.should.eql('Invalid Id');
                      done();
                    });
                });
            });
        });
    });
    it("should respond with an error message if title field has characters that aren't alphanumeric", (done) => {
      const updatedDiaryEntry = {
        title: 'A boy ? no name',
        description: 'Boom',
        privacy: 'private'
      };
      const registrationDetails = {
        username: 'NoToken0',
        password: 'testPassword',
        email: 'testNoTokenProvided0@test.com'
      };
      const diaryEntry2 = {
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
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(diaryEntry2)
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.should.have.property('message');
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
                .send(updatedDiaryEntry)
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
    it('should respond with an error message if title field has fewer than 4 characters', (done) => {
      const diaryEntry = {
        title: 'blo',
        description: 'Boom',
        privacy: 'private'
      };
      const correctEntry = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const registrationDetails5 = {
        username: 'invalidToken',
        password: 'testPassword',
        email: 'invalidTokenProvided@test.com'
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails5)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(correctEntry)
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.should.have.property('message');
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
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
        });
    });
    it('should respond with an error message if description field has fewer than 4 characters', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Ant',
        privacy: 'private'
      };
      const correctEntry2 = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const registrationDetails6 = {
        username: 'test',
        email: 'test@test.com',
        password: 'secret key is bae'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails6)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(correctEntry2)
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.should.have.property('message');
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
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
    it('it should respond with an error message if description field consists of forbidden special characters', (done) => {
      const correctEntry2 = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const testUser = {
        username: 'test1',
        email: 'test1@test.com',
        password: 'secret key is bae'
      };
      const diaryEntry = {
        title: 'test',
        description: 'I am a boss &&',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(correctEntry2)
            .end((err, res) => {
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
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
        });
    });
    it('should respond with an error message if description field has no alphabet', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: '123',
        privacy: 'public'
      };
      const correctEntry3 = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const registrationDetails7 = {
        username: 'test2',
        email: 'test2@test.com',
        password: 'secret key is bae'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails7)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(correctEntry3)
            .end((err, res) => {
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
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
        });
    });
    it("should respond with an error message if privacy field has values other than 'private' or 'public'", (done) => {
      const correctEntry4 = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const invalidEntry = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'invalid privacy'
      };
      const registrationDetails8 = {
        username: 'test3',
        email: 'test3@test.com',
        password: 'secret key is bae'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails8)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(correctEntry4)
            .end((err, res) => {
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
                .send(invalidEntry)
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
    it('should respond with an error message if all three inputs are left undefined', (done) => {
      const validDiaryEntry = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const invalidDiaryEntry = {

      };
      const signupDetails = {
        username: 'test5',
        email: 'test5@test.com',
        password: 'secret key is bae'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(validDiaryEntry)
            .end((err, res) => {
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
                .send(invalidDiaryEntry)
                .end((err, res) => {
                  res.should.have.status(400);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('inputField');
                  res.body.errors.inputField.should.eql('Please change the value of at least one input field');
                  done();
                });
            });
        });
    });
  });
  describe('Default values', () => {
    it("should have a default privacy value of 'private' when the privacy input field is undefined", (done) => {
      const correctEntry5 = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const diaryEntry2 = {
        title: 'new title',
        description: 'new description',
      };
      const registrationDetails9 = {
        username: 'test6',
        email: 'test6@test.com',
        password: 'secret key is bae'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails9)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(correctEntry5)
            .end((err, res) => {
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
                .send(diaryEntry2)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('updated');
                  res.body.updated.should.have.property('privacy');
                  res.body.updated.privacy.should.eql('private');
                  done();
                });
            });
        });
    });
    it("should have a default privacy value of 'private' when the privacy input field is empty", (done) => {
      const correctEntry6 = {
        title: 'valid title',
        description: 'valid description',
        privacy: 'private'
      };
      const diaryEntry3 = {
        title: 'new title',
        description: 'new description',
      };
      const registrationDetails10 = {
        username: 'test7',
        email: 'test7@test.com',
        password: 'secret key is bae'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails10)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(correctEntry6)
            .end((err, res) => {
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
                .send(diaryEntry3)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('updated');
                  res.body.updated.should.have.property('privacy');
                  res.body.updated.privacy.should.eql('private');
                  done();
                });
            });
        });
    });
  });
  describe('Authentication errors', () => {
    it("should throw an error if there's no token provided", (done) => {
      const registrationDetails = {
        username: 'NoToken1',
        password: 'testPassword',
        email: 'testNoToken1@test.com'
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
          let token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(diaryEntry)
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              token = '';
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
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
    });
    it('should throw an error if an invalid token is provided', (done) => {
      const signupDetailsInvalidToken = {
        username: 'invalidToken10',
        password: 'testPassword',
        email: 'invalidToken10@test.com'
      };
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Game of Thrones reference',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetailsInvalidToken)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          let token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(diaryEntry)
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              token = `${res.body.token} 2`;
              chai.request(server)
                .put(`/api/v1/entries/${res.body.data.id}`)
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
  });
  describe('non-existent diary entry', () => {
    it('should get a 404 not found status message if entry does not exist', (done) => {
      const registrationDetails = {
        username: 'test8',
        email: 'test8@yahoo.com',
        password: 'iAMAwesome'
      };
      const entry = {
        title: 'A savage man on Twitter',
        description: 'Piers Morgan',
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
            .send(entry)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(201);
              chai.request(server)
                .put('/api/v1/entries/8fff7a77-7d7d-77e1-a888-10d8888888d8')
                .send(entry)
                .set('token', token)
                .end((err, res) => {
                  res.should.have.status(404);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                  res.body.message.should.be.a('string');
                  res.body.message.should.eql('Diary entry not found');
                  done();
                });
            });
        });
    });
  });
  describe('Modify diary entry success message', () => {
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
      const modifyTestSignupDetails = {
        username: 'modifyTest200',
        email: 'modifyTest200@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(modifyTestSignupDetails)
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
                .put(`/api/v1/entries/${res.body.data.id}`)
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
});

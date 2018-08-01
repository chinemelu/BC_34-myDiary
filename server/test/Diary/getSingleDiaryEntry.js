import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries/<entryId> API route', () => {
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
  describe('Authentication errors', () => {
    it("should throw an error if there's no token provided", (done) => {
      const registrationDetails = {
        username: 'extremeDiff',
        password: 'testPassword',
        email: 'extremeDiffT@test.com'
      };
      const newDiaryEntry = {
        title: 'My name',
        description: 'My name is Tony',
        privacy: 'private'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          let { token } = res.body;
          chai.request(server)
            .post('/api/v1/entries')
            .set('token', token)
            .send(newDiaryEntry)
            .end((err, res) => {
              token = '';
              res.should.have.status(201);
              chai.request(server)
                .get(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
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
      const registrationDetails = {
        username: 'invaldiGETentry',
        password: 'testPassword',
        email: 'invalidGETentry@test.com'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token} 2`; // concatenate an extra number to make token invalid
          chai.request(server)
            .get('/api/v1/entries/555a5728-677a-4056-b7fc-bad11eb6e822') // unlikely UUID
            .set('token', token)
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
  describe('Validation errors', () => {
    it('it should respond with an error message if id is not a UUID', (done) => {
      const registrationDetails = {
        username: 'ultraNewUser',
        email: 'ultraNewEmail@yahoo.com',
        password: 'iAMAwesome'
      };
      const diaryEntry = {
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
            .send(diaryEntry)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(201);
              chai.request(server)
                .get('/api/v1/entries/a')
                .set('token', token)
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
  describe('Success response', () => {
    it('it should list a single diary entry if database table has the entry', (done) => {
      const registrationDetails = {
        username: 'newUsername',
        email: 'newEmail@yahoo.com',
        password: 'iAMAwesome'
      };
      const diaryEntry = {
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
            .send(diaryEntry)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(201);
              chai.request(server)
                .get(`/api/v1/entries/${res.body.data.id}`)
                .set('token', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('data');
                  res.body.data.should.be.a('object');
                  res.body.data.should.have.property('id');
                  res.body.data.should.have.property('title');
                  res.body.data.title.should.eql('A savage man on Twitter');
                  res.body.data.should.have.property('description');
                  res.body.data.description.should.eql('Piers Morgan');
                  res.body.data.should.have.property('privacy');
                  res.body.data.privacy.should.eql('private');
                  done();
                });
            });
        });
    });
  });
});

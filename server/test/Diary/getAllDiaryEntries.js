import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries', () => {
  describe('Authentication errors', () => {
    beforeEach((done) => {
      db('DELETE from entries', () => {
        done();
      });
    });
    it("should throw an error if there's no token provided", (done) => {
      const registrationDetails = {
        username: 'NoTokenGET',
        password: 'testPassword',
        email: 'testNoTokenProvidedGET@test.com'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = '';
          chai.request(server)
            .get('/api/v1/entries')
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
    it('should throw an error if an invalid token is provided', (done) => {
      const signupDetails3 = {
        username: 'invalidTokenGET',
        password: 'testPassword',
        email: 'invalidTokenProvidedGET@test.com'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetails3)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token} c`;
          chai.request(server)
            .get('/api/v1/entries')
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
  describe('Empty database response', () => {
    it("should indicate if there's no diary entry for a particular user", (done) => {
      const signupDetails = {
        username: 'emptyDatabase2',
        password: 'testPassword',
        email: 'emptyDatabase2@test.com'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const { token } = res.body;
          chai.request(server)
            .get('/api/v1/entries')
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('There are no available diary entries');
              done();
            });
        });
    });
  });
  describe('Get All Diary entries success', () => {
    it('it should list all diary entries if database table has an entry', (done) => {
      const signupDetails1 = {
        username: 'getAllEntries',
        password: 'testPassword',
        email: 'getAllEntries@test.com'
      };
      const diaryEntry = {
        title: 'getAllDiaryEntries',
        description: 'I am getting all my entries',
        privacy: 'public'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetails1)
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
                .get('/api/v1/entries')
                .set('token', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('data');
                  res.body.data.should.be.a('array');
                  res.body.data[0].should.have.property('id');
                  res.body.data[0].should.have.property('title');
                  res.body.data[0].should.have.property('description');
                  res.body.data[0].should.have.property('privacy');
                  done();
                });
            });
        });
    });
  });
});

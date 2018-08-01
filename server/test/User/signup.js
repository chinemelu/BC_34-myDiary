import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup API route', () => {
  beforeEach((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  afterEach((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  describe('Conflict errors', () => {
    it('should respond with a conflict error if the username already exists', (done) => {
      const registrationDetails = {
        username: 'usernameexists',
        email: 'usernameexists@yahoo.com',
        password: 'iAMAwesome'
      };
      const newRegistrationDetails = {
        username: 'usernameexists',
        email: 'teejay@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          chai.request(server)
            .post('/api/v1/auth/signup')
            .send(newRegistrationDetails)
            .end((err, res) => {
              res.should.have.status(409);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('usernameExists');
              res.body.errors.usernameExists.should.be.a('string');
              res.body.errors.usernameExists.should.eql('username exists');
              done();
            });
        });
    });
    it('should respond with a conflict error if the email already exists', (done) => {
      const registrationDetails2 = {
        username: 'tony',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      const newRegistrationDetails2 = {
        username: 'username',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails2)
        .end((err, res) => {
          res.should.have.status(201);
          chai.request(server)
            .post('/api/v1/auth/signup')
            .send(newRegistrationDetails2)
            .end((err, res) => {
              res.should.have.status(409);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('emailExists');
              res.body.errors.emailExists.should.be.a('string');
              res.body.errors.emailExists.should.eql('email exists');
              done();
            });
        });
    });
  });
  describe('Validation errors', () => {
    it('should respond with an error if the username field is undefined', (done) => {
      const registrationDetails = {
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('username');
          res.body.errors.username.should.be.a('string');
          res.body.errors.username.should.eql('Username field must not be empty');
          done();
        });
    });
    it('should respond with an error if the username field is empty', (done) => {
      const registrationDetails = {
        username: '',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('username');
          res.body.errors.username.should.be.a('string');
          res.body.errors.username.should.eql('Username field must not be empty');
          done();
        });
    });
    it('should respond with an error if the username field contains non alphanumeric characters', (done) => {
      const registrationDetails = {
        username: 'A&nthony1',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('username');
          res.body.errors.username.should.be.a('string');
          res.body.errors.username.should.eql('Username should consist of only alphanumeric \n'
          + 'characters and must contain no spaces between characters');
          done();
        });
    });
    it('should respond with an error if the username field contains more than 15 characters', (done) => {
      const registrationDetails = {
        username: 'Anthony123456789',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('username');
          res.body.errors.username.should.be.a('string');
          res.body.errors.username.should.eql('Username must have a minimum length of 4 characters and a maximum \n'
          + 'length of 15 characters');
          done();
        });
    });
    it('should respond with an error if the username field contains fewer than 4 characters', (done) => {
      const registrationDetails = {
        username: 'Ant',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('username');
          res.body.errors.username.should.be.a('string');
          res.body.errors.username.should.eql('Username must have a minimum length of 4 characters and a maximum \n'
          + 'length of 15 characters');
          done();
        });
    });
    it('should respond with an error if the email field is undefined', (done) => {
      const registrationDetails = {
        password: 'superstrongpassword',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('Email field must not be empty');
          done();
        });
    });
    it('should respond with an error if the email field is empty', (done) => {
      const registrationDetails = {
        username: 'teejay2k4',
        email: '',
        password: 'IAMawesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('Email field must not be empty');
          done();
        });
    });
    it('should respond with an error if the email input is invalid', (done) => {
      const registrationDetails = {
        username: 'teejay2k4',
        email: 'teejay2k4@',
        password: 'IAMawesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('The email you entered is invalid');
          done();
        });
    });
    it('should respond with an error if the password field is undefined', (done) => {
      const registrationDetails = {
        username: 'teejay2k4',
        email: 'teejay2k4@yahoo.com',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password field must not be empty');
          done();
        });
    });
    it('should respond with an error if the password field is empty', (done) => {
      const registrationDetails = {
        username: 'teejay2k4',
        email: 'teejay2k4@yahoo.com',
        password: ''
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password field must not be empty');
          done();
        });
    });
    it('should respond with an error if the password field contains more than 20 characters', (done) => {
      const registrationDetails = {
        username: 'Anth',
        email: 'teejay2k4@yahoo.com',
        password: 'morethantwentycharacters'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password must have a minimum length of 8 characters and \n'
          + 'a maximum length of 20 characters');
          done();
        });
    });
    it('should respond with an error if the password field contains fewer than 8 characters', (done) => {
      const registrationDetails = {
        username: 'Anth',
        email: 'teejay2k4@yahoo.com',
        password: 'fewer'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password must have a minimum length of 8 characters and \n'
          + 'a maximum length of 20 characters');
          done();
        });
    });
    describe('Signup Success', () => {
      it('should register a user if there are no validation errors', (done) => {
        const registrationDetails = {
          username: 'chinemelu',
          email: 'chinemelunwosu@gmail.com',
          password: 'iAMAwesome'
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(registrationDetails)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.username.should.be.a('string');
            res.body.username.should.eql('chinemelu');
            res.body.email.should.eql('chinemelunwosu@gmail.com');
            res.body.should.have.property('token');
            res.body.should.have.property('message');
            res.body.message.should.eql('chinemelu, you have successfully created an account');
            done();
          });
      });
    });
  });
});

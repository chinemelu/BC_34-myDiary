import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';
import pool from '../../../../../models/db';


chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  before((done) => {
    const query = "INSERT INTO users(username, email, password) VALUES ('teejay2k4', 'tony@yahoo.com','iamawesome')";
    pool.connect() // connect to database
      .then(client => client.query(query)
        .then(() => done())
        .catch(() => {
          client.release();
        }));
  });
  it('should respond with a conflict error if the username already exists', (done) => {
    const registrationDetails = {
      username: 'teejay2k4',
      email: 'teejay2k4@yahoo.com',
      password: 'iAMAwesome'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
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

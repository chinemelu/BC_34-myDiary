import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';
import pool from '../../../../../models/db';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  before((done) => {
    pool.connect() // connect to database
      .then(client => client.query('DELETE from users')
        .then(() => done())
        .catch(() => {
          client.release();
        }));
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
});

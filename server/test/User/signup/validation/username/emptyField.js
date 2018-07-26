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
        .then(() => {
        })
        .catch(() => {
          client.release();
        }));
    done();
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
});

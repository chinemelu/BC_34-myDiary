import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';
import pool from '../../../../models/db';


chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  before((done) => {
    const query = 'DELETE from users'; // delete all rows from users table
    pool.connect() // connect to database
      .then(client => client.query(query)
        .then(() => done())
        .catch(() => {
          client.release();
        }));
  });
  it('should login a user if there are no validation errors', (done) => {
    const registrationDetails = {
      username: 'teejay2k4',
      email: 'teejay2k4@yahoo.com',
      password: 'iAMAwesome'
    };
    const loginDetails = {
      email: 'teejay2k4@yahoo.com',
      password: 'iAMAwesome'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(registrationDetails)
      .end(() => {
        chai.request(server)
          .post('/api/v1/auth/login')
          .send(loginDetails)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            res.body.should.have.property('email');
            res.body.email.should.eql('teejay2k4@yahoo.com');
            res.body.should.have.property('message');
            res.body.message.should.eql('teejay2k4, you have successfully logged in');
            done();
          });
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/entries/<entry id>', () => {
  it('it should respond with an error message if id is not a UUID', (done) => {
    chai.request(server)
      .get('/api/v1/entries/a')
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

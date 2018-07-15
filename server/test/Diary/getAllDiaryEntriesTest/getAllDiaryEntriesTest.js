import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('diary entries', () => {
  describe('GET: /api/v1/entries', () => {
    it('it should list all diary entries', (done) => {
      chai.request(server)
        .get('/api/v1/entries')
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

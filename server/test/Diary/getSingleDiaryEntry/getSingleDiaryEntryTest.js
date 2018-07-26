import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);

describe('diary entries', () => {
  describe('GET: /api/v1/entries/<entry id>', () => {
    it('should get the details of a SINGLE diary entry when there are no errors', (done) => {
      chai.request(server)
        .get('/api/v1/entries/11')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('title');
          res.body.data.title.should.be.a('string');
          res.body.data.title.should.eql('A girl has no name');
          res.body.data.should.have.property('description');
          res.body.data.description.should.be.a('string');
          res.body.data.description.should.eql('Game of Thrones redefined');
          res.body.data.should.have.property('privacy');
          res.body.data.privacy.should.be.a('string');
          res.body.data.privacy.should.eql('public');
          done();
        });
    });
  });
});

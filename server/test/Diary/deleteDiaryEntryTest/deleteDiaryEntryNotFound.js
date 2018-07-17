import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);
describe('delete diary entry', () => {
  describe('DELETE: /api/v1/entries/<entry id>', () => {
    it('should get a 404 not found status message if entry does not exist', (done) => {
      chai.request(server)
        .delete('/api/v1/entries/15')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Diary entry not found');
          done();
        });
    });
  });
});

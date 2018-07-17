import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);
describe('delete diary entry', () => {
  describe('DELETE: /api/v1/entries/<entry id>', () => {
    it('it should respond with an error message if id is not an integer', (done) => {
      chai.request(server)
        .delete('/api/v1/entries/a')
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
});

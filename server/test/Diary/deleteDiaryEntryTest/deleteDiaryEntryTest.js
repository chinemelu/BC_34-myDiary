import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.should();
chai.use(chaiHttp);
describe('delete diary entry', () => {
  describe('DELETE: /api/v1/entries/<entry Id>', () => {
    it('it should delete a diary entry', (done) => {
      chai.request(server)
        .delete('/api/v1/entries/5')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.a.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('You have successfully deleted the diary entry');
          res.body.should.have.property('deleted');
          res.body.deleted.should.be.a('object');
          res.body.deleted.title.should.eql('Your secondary school');
          res.body.deleted.description.should.eql('My secondary school is ISL');
          res.body.deleted.privacy.should.eql('private');
          done();
        });
    });
  });
});

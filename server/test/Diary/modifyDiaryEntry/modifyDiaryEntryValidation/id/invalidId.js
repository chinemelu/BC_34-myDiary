import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);
describe('diary entries', () => {
  describe('PUT: /api/v1/entries/<entry id>', () => {
    it('it should respond with an error message if id is not an integer', (done) => {
      const diaryEntry = {
        title: 'update title 1',
        description: 'update description 1',
        privacy: 'public'
      };
      chai.request(server)
        .put('/api/v1/entries/a')
        .send(diaryEntry)
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

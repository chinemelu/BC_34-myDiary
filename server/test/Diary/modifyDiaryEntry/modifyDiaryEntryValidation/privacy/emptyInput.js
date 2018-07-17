import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('diary entries', () => {
  describe('PUT: /api/v1/entries/<entry Id>', () => {
    it('should have a default privacy value of \'private\' when the privacy input field is empty', (done) => {
      const diaryEntry = {
        title: 'A boy has no name',
        description: 'Game of Thrones reference',
        privacy: ''
      };
      chai.request(server)
        .put('/api/v1/entries/1')
        .send(diaryEntry)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('privacy');
          res.body.data.privacy.should.eql('private');
          done();
        });
    });
  });
});

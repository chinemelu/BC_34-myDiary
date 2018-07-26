import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/entries', () => {
  it('it should respond with an error message if title field is undefined', (done) => {
    const diaryEntry = {
      description: 'update description 1',
      privacy: 'public'
    };
    chai.request(server)
      .post('/api/v1/entries')
      .send(diaryEntry)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('title');
        res.body.errors.title.should.be.a('string');
        res.body.errors.title.should.eql('Title field is required');
        done();
      });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Update the path accordingly
const fs = require('fs');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /process-audio', function () {
    this.timeout(10000000);
    it('should transcribe audio and return a 200 response', (done) => {
        chai.request(app)
            .post('/process-audio')
            .attach('audio', fs.readFileSync('audio_recording.mp3'), 'audio_recording.mp3') // Update the path accordingly
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('transcribed_text');
                done();
            });
    });

    it('should return a 400 response if no audio file is provided', (done) => {
        chai.request(app)
            .post('/process-audio')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });
});

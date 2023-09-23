const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Update the path accordingly
const fs = require('fs');

chai.use(chaiHttp);
const expect = chai.expect;

// describe('POST /process-audio', function () {
//     this.timeout(10000000);
//     it('should transcribe audio and return a 200 response', (done) => {
//         chai.request(app)
//             .post('/process-audio')
//             .attach('audio', fs.readFileSync('audio_recording.mp3'), 'audio_recording.mp3') // Update the path accordingly
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });

//     it('should return a 400 response if no audio file is provided', (done) => {
//         chai.request(app)
//             .post('/process-audio')
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });
// });
const context = fs.readFileSync("output.txt", "utf8");
const transcribed_text = fs.readFileSync("transcript.txt", "utf8");

describe('POST /send-to-gpt', function () {
    this.timeout(10000000);
    it('should return a successful response with GPT-generated text', (done) => {

        // Define a mock request body with transcript
        const requestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: context
                },
                {
                    role: "user",
                    content: transcribed_text
                }
            ],
        };

        chai.request(app)
            .post('/send-to-gpt')
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.equal(true);
                done();
            });
    });
});
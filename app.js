"use strict";

const express = require('express');
const environmentVars = require("dotenv").config();


const app = express();
const port = process.env.PORT || 1337;
const server = require("http").createServer(app);

const io = require("socket.io")(server);
const { OpenAI } = require("openai");
const fs = require("fs");


const openai = new OpenAI({
    apiKey: fs.readFileSync("openai-key.txt", "utf8"),
});

const policies = fs.readFileSync("output.txt", "utf8");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Transcribe audio
async function transcribeAudio(filename) {
    const transcript = await openai.createTranscription(
      fs.createReadStream(filename),
      "whisper-1"
    );
    return transcript.data.text;
}


// Placeholder routes for audio processing and API calls

const audio_filename = "audio_recording.mp3";

// Route to receive and process the recorded audio
app.post('/process-audio', (req, res) => {
    process.stdout.write("sending to whisper: " + audio_file.name());

    const transcribed_text = transcribeAudio(audio_file);
});



// Route to send transcription to GPT for summarization
app.post('/send-to-gpt', (req, res) => {
    // let transcribed_text = you need to get the question from the transcription API
    // send the user question to GPT
    process.stdout.write("sending to gpt: " + transcribed_text);

    const completion = openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: context },
            {
                role: "user",
                content: transcribed_text,
            },
        ],
        stream: true,
        max_tokens: 150,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


"use strict";

const express = require('express');
const environmentVars = require("dotenv").config();
const fs = require("fs");
const { OpenAI } = require("openai");

const app = express();
const port = process.env.PORT || 1337;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const openai = new OpenAI({
    apiKey: fs.readFileSync("openai-key.txt", "utf8"),
});
module.exports = app;
const policies = fs.readFileSync("output.txt", "utf8");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Transcribe audio
// Transcribe audio
async function transcribeAudio(filename) {
    const transcript = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filename),
        model: "whisper-1",
    });
    console.log(transcript.text);
    return transcript.text;
}

app.get('/', (req, res) => {
    const imageFileName = 'logo.jpg'; // Replace with your image file name or path
    res.render('index.ejs', { imageFileName });
});

const audio_filename = "audio_recording.mp3";

// Route to receive and process the recorded audio
app.post('/process-audio', async (req, res) => {
    try {
        const transcribed_text = await transcribeAudio(audio_filename);
        console.log("Transcribed text:", transcribed_text);
        res.status(200).json({ success: true, transcript: transcribed_text });
    } catch (error) {
        console.error("Error processing audio:", error);
        res.status(400).json({ success: false, error: "Audio processing failed" });
    }
});

// Route to send transcription to GPT for summarization
app.post('/send-to-gpt', async (req, res) => {
    try {
        const transcribed_text = req.body.transcript; // Assuming the client sends the transcript in the request body
        console.log("Sending to GPT:", transcribed_text);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You can specify the system message here" },
                {
                    role: "user",
                    content: transcribed_text,
                },
            ],
            stream: true,
            max_tokens: 150,
        });

        const gptResponse = completion.choices[0].message.content;
        console.log("GPT Response:", gptResponse);
        res.json({ success: true, gptResponse });
    } catch (error) {
        console.error("Error sending to GPT:", error);
        res.status(400).json({ success: false, error: "GPT request failed" });
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

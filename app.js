"use strict";

const express = require('express');
const environmentVars = require("dotenv").config();
const fs = require("fs");
const { OpenAI } = require("openai");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 1337;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const openai = new OpenAI({
    apiKey: fs.readFileSync("openai-key.txt", "utf8"),
});
module.exports = app;
const context = fs.readFileSync("output.txt", "utf8");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Transcribe audio
async function transcribeAudio(filename) {
    const transcript = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filename),
        model: "whisper-1",
    });
    return transcript.text;
}

// Organize notes based on transcript
async function OrganizeNotes(context, transcribed_text) {
    const notes = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: context },
            { role: "user", content: transcribed_text },
        ],
    });
    return notes.choices[0].message.content;
}


// app.post('/upload', upload.single('file'), (req, res) => {
//     // Access the uploaded file via req.file
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     // convert if needed

//     // Respond with a success message
//     res.status(200).send('File uploaded successfully');
// });

// Route to receive and process the recorded audio
app.post('/process-audio', async (req, res) => {

    try {
        // Get the audio blob from the request body
        const audioBlob = req.body;
        console.log(audioBlob)

        // Generate a unique filename or use a timestamp
        const fileName = `audio_recording.mp3`;

        // Specify the path where you want to save the MP3 file
        const filePath = `./${fileName}`;

        // Write the audio blob to the file
        const ffmpeg = require('fluent-ffmpeg');
        const { Readable } = require('stream');
        return new Promise((resolve, reject) => {
            const inputStream = new Readable();
            if (audioBlob) {
                inputStream.push(audioBlob);
                inputStream.push(null);
            }

            const outputStream = fs.createWriteStream(filePath);

            const ffmpegCommand = ffmpeg();
            ffmpegCommand.input(inputStream)
                .toFormat('mp3')
                .audioCodec('libmp3lame')
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    resolve(filePath);
                })
                .pipe(outputStream, { end: true });
        });

    } catch (error) {
        console.error('Error saving audio:', error);
        res.status(400).json({ error: 'Failed to save audio' });
    }
    const audio_filename = 'audio_recording.mp3';
    // Transcribe the audio and process success or failure events
    try {
        const transcribed_text = await transcribeAudio(audio_filename);
        console.log("Transcribed text:", transcribed_text);
        fs.writeFile('transcript.txt', transcribed_text, "utf8", (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
    } catch (error) {
        console.error("Error processing audio:", error);
        res.status(400).json({ success: false, error: "Audio processing failed" });
        return;
    }

    // Organize the notes and process success or failure events
    try {
        const transcribed_text = fs.readFileSync("transcript.txt", "utf8");
        const gptResponse = await OrganizeNotes(context, transcribed_text);
        console.log("GPT Response: ", gptResponse);
        res.status(200).json({ success: true, gptResponse });
    } catch (error) {
        console.error("Error sending to GPT:", error);
        res.status(400).json({ success: false, error: "GPT request failed" });
    }
});

// Send notes and summary text to the frontend
app.post('/send-notes', async (req, res) => {
    try {
        console.log("Sending notes");
    } catch (error) {
        console.error("Error sending notes text to Frontend:", error);
        res.status(400).json({ success: false, error: "Notes request failed" });
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
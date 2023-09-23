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

// Placeholder routes for audio processing and API calls

// Route to receive and process the recorded audio
app.post('/process-audio', (req, res) => {

    // Implement audio processing logic here
    // Receive the audio file and perform necessary tasks
    // Send back the results as a response
    res.status(200).json({ message: 'Audio processing route placeholder' });
});

// Route to send transcription to GPT for summarization
app.post('/send-to-gpt', (req, res) => {
    // Implement the code to send transcription to GPT for summarization
    // Receive the GPT response and process it
    // Send back the summary and notes as a response
    res.status(200).json({ message: 'GPT API call placeholder' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


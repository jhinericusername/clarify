import os
import openai

key_file = open("openai-key.txt", "r")
key_str = key_file.read()
print(key_str)
openai.api_key = key_str

audio_file = open("audio_recording.mp3", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)

print(transcript)
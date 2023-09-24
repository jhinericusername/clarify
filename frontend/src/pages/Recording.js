import Navbar from '../components/Navbar'
import { BsFillStopCircleFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'

import './styles.css'

const Recording = () => {
    const [time, setTime] = useState(0)
    const [mediaStream, setMediaStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);


    useEffect(() => {
        startRecording();
        const recordingTime = setInterval(() => {
            setTime((prev) => (prev + 1))
        }, 1000)

        return () => {
            stopRecording();
            clearInterval(recordingTime)
        };
    }, [])


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    setAudioChunks([...audioChunks, e.data]);
                }
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
                const formData = new FormData();
                formData.append('audio', audioBlob, 'audio_recording.mp3');

                // Send the formData to your backend API for saving
                fetch('http://localhost:1337/process-audio', {
                    method: 'POST',
                    body: formData,
                });

                // Reset the audioChunks for the next recording
                setAudioChunks([]);
            };

            setMediaStream(stream);
            setMediaRecorder(recorder);
            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        
        if (mediaRecorder) {
            console.log("trying to stop")
            mediaRecorder.stop();
            mediaStream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
        }
    };

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <div className='body'>
            <Navbar />
            <div className='hero'>
                <div className="hero-title">
                    <div className="hero-subtitle-1">
                        Recording in
                    </div>
                    <div className="hero-subtitle-2">Progress</div>
                    <div className='buttonBar'>
                        <div onClick={stopRecording} className='stopRecording'>
                            <BsFillStopCircleFill />
                        </div>
                        <img src="soundbar.gif" className='soundbar' />
                        <div className='time'>
                            {formatTime(time)}
                        </div>
                    </div>
                </div>
            </div>
            <img src='/notieGIF.gif' className='notieGIF' alt='duck gif' />
        </div>
    )
}

export default Recording
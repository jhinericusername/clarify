import Navbar from '../components/Navbar'
import { BsFillStopCircleFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder'
import { useNavigate } from 'react-router-dom'

import './styles.css'

const Recording = () => {
    const [time, setTime] = useState(0)
    const [isRecording, setIsRecording] = useState(false);
    const navigate = useNavigate()

    const [audioUrl, setAudioUrl] = useState(null);

    const handleRecordingComplete = (blob) => {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
    };

    function handleRecording() {
        setIsRecording(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        navigate('/notes')
    }

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
                        {isRecording ? "Recording in" : "Press record"}
                    </div>
                    <div className="hero-subtitle-2">
                        {isRecording ? "progress" : "below  "}
                    </div>
                    {/* <div className='buttonBar'> */}
                    {/* <div className='stopRecording'>
                            <BsFillStopCircleFill />
                        </div>
                        <img src="soundbar.gif" className='soundbar' /> */}
                    {/* <div className='time'> */}
                    {/* {formatTime(time)} */}
                    {/* </div> */}
                    <div className="recorder" onClick={handleRecording}>
                        <AudioRecorder
                            onRecordingComplete={handleRecordingComplete}
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                            downloadOnSavePress={true}
                            downloadFileExtension="mp3"
                            showVisualizer={true}
                        />

                        {audioUrl && (
                            <audio controls src={audioUrl}></audio>
                        )}
                    </div>

                    <div onClick={handleSubmit} className='buttonBar'>
                        Submit
                    </div>

                    {/* </div> */}
                </div>
            </div>
            <img src='/notieGIF.gif' className='notieGIF' alt='duck gif' />
        </div>
    )
}

export default Recording
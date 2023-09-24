import Navbar from '../components/Navbar'
import { BsFillStopCircleFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'

import './styles.css'

const Recording = () => {
    const words = ['Ideas,', 'Thoughts,', 'Plans,']
    const [time, setTime] = useState(0)

    useEffect(() => {
        const recordingTime = setInterval(() => {
            setTime((prev) => (prev + 1))
        }, 1000)

        return () => {
            clearInterval(recordingTime)
        }
    }, [])


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
                        <div className='stopRecording'>
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
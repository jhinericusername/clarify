import Navbar from '../components/Navbar'
import { FiUpload } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';

import './styles.css'

const Notes = () => {
    const [dots, setDots] = useState(1);
    const [loading, setLoading] = useState(false);
    // const [text, setText] = useState("")

    const dotLimit = 4;
    let pitch = "theraview is cool"
    let notes = "theraview is reallllllllllly cool"
    let text = "theraview is an artificial intelligence-based medical tool for those who are in physical therapy and may need more assistance performing exercises at home."

    useEffect(() => {

        // query GPT here (i.e. look for audio file and process)
        // assign values to pitch and summary variables


        const dotCount = setInterval(() => {
            setDots((prev) => (prev + 1) % dotLimit)
        }, 1000)

        return () => {
            clearInterval(dotCount)
        }
    })

    // function handlePitch() { 
    //     setText(pitch)
    // }
    // function handleSummary() { 
    //     setText(summary)
    // }

    return (
        <div className='body'>
            <Navbar />

            {/* Hero */}
            <div className="notes-box">
                {loading
                    ? <div>
                        <div className="hero-subtitle-1">Generating</div>
                        <div className="hero-subtitle-2">Notes&nbsp;
                            {'. '.repeat(dots)}
                        </div>

                    </div>
                    :
                    <div className='loaded-container'>
                        <TypeAnimation
                            sequence={[
                                "Notes", 1
                            ]}
                            speed={20}
                            style={{ fontSize: '40px' }}
                            cursor={false}
                            className='text-heading' />
                        <div className='typing-box-1'>
                            <TypeAnimation
                                sequence={[
                                    notes,
                                ]}
                                speed={60}
                                style={{ fontSize: '22px' }} />
                            {/* loading OR moving text box  530w 410h*/}
                        </div>
                        {/* <div className='textButtons'>
                            <div className='pitchButton' onClick={handlePitch}>Show Pitch</div>
                            <div className='summaryButton' onClick={handleSummary}>Show Summary</div>
                        </div> */}
                    </div>
                }
            </div>
            {/* <div className="pitch-box">
                <TypeAnimation
                    sequence={[
                        "Pitch", 1
                    ]}
                    speed={20}
                    style={{ fontSize: '40px' }}
                    cursor={false}
                    className='pitch-heading' />

                <div className='typing-box-2'>
                    <TypeAnimation
                        sequence={[
                            pitch,
                        ]}
                        speed={60}
                        style={{ fontSize: '22px' }} />
                </div>
            </div> */}

            <img src='/notieThumbs.png' alt='duck' className='notieThumbs' />
        </div>
    )
}

export default Notes
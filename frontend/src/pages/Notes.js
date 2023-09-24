import Navbar from '../components/Navbar'
import { FiUpload } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';

import './styles.css'

const Notes = () => {
    const [dots, setDots] = useState(1);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState("theraview")
    // const [text, setText] = useState("")

    const dotLimit = 4;
    let pitch = "theraview is cool"
    // let notes = "theraview is reallllllllllly cool"
    let text = "theraview is an artificial intelligence-based medical tool for those who are in physical therapy and may need more assistance performing exercises at home."
    let ignore = false;

    useEffect(() => {
        if (!ignore) {
            // query GPT here (i.e. look for audio file and process)
            // assign values to pitch and summary variables
           links()

        }

        const dotCount = setInterval(() => {
            setDots((prev) => (prev + 1) % dotLimit)
        }, 1000)

        return () => {
            
            clearInterval(dotCount)
        }
    }, []);

    const links = async () => {
        let result = ''
        fetch("http://localhost:1337/process-audio")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            ignore = true;
            return response.json(); // Parse the JSON response
        })
        .then((data) => {
            // Access the 'message' field from the JSON data
            result = data.message;
            setNotes(result)
            setLoading(false);

            // Now, you can use the 'message' variable in your component
            console.log(notes);
          })
        .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });

    }

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
                                    (notes), 1
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
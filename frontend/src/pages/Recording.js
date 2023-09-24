import Navbar from '../components/Navbar'
import RecordButton from '../components/RecordButton'
import { FiUpload } from 'react-icons/fi'
import { useEffect, useState } from 'react'

import './styles.css'

const Recording = () => {
    const words = ['Ideas,', 'Thoughts,', 'Plans,']
    const [ currIndex, setCurrIndex ] = useState(0)

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrIndex((prev) => (prev+1) % words.length)
        }, 1000)

            return () => {
                clearInterval(intervalID)
            }
    }, [])

	return (
		<div className='body'>
			<Navbar />

			{/* Hero */}
			<div className='hero'>
				<div className="hero-title">
					<div className="hero-subtitle-1">Your 
                        <div>
                        {words[currIndex]}
                        </div>
                    </div>
					<div className="hero-subtitle-2">Noted.</div>
					<div className='buttons'>
						<RecordButton/>
						<div className='uploadButton'>
							<FiUpload className='upload'/>
						</div>
					</div>
				</div>
			</div>
			<img src='/notie.png' alt='duck' className='notie'/>
		</div>
	)
}

export default Recording
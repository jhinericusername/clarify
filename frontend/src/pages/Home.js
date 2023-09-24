import Navbar from '../components/Navbar'
import RecordButton from '../components/RecordButton'
import { FiUpload } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'

const Home = () => {
	const words = ['Ideas,', 'Thoughts,', 'Plans,']
	const [currIndex, setCurrIndex] = useState(0)
	const navigate = useNavigate();

	useEffect(() => {
		const intervalID = setInterval(() => {
			setCurrIndex((prev) => (prev + 1) % words.length)
		}, 1250)

		return () => {
			clearInterval(intervalID)
		}
	}, [])

	function handleRecord() {
			if (!error) {
				e.preventDefault()
				navigate('/recording')
			}
		
	}

	return (
		<div className='body'>
			{/* Hero */}
			<div className='hero'>
				<div className="hero-title">
					<div className="hero-subtitle-1">Your&nbsp;
						<div className='changing'>
							{words[currIndex]}
						</div>
					</div>
					<div className="hero-subtitle-2">Noted.</div>
					<div className='buttons'>
						<div onClick={handleRecord}>
							<RecordButton />
						</div>
						<div className='uploadButton'>
							<FiUpload className='upload' />
						</div>
					</div>
				</div>
			</div>
			<img src='/notie.png' alt='duck' className='notie' />
		</div>
	)
}

export default Home
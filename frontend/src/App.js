import Home from './pages/Home';
import Recording from './pages/Recording';
import Notes from './pages/Notes';

import { Route, Routes } from "react-router-dom";

function App() {

	return (
		<div>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/recording' element={<Recording/>} />
				<Route path='/notes' element={<Notes/>} />
			</Routes>
		</div>
	);
}

export default App;

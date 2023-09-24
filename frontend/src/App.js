import Home from './pages/Home';
import Recording from './pages/Recording';
import { Route, Routes } from "react-router-dom";

function App() {

	return (
		<div>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/recording' element={<Recording/>} />
			</Routes>
		</div>
	);
}

export default App;

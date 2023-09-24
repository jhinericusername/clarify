import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route, Routes } from "react-router-dom";

function App() {

	return (
		<div>
			<Navbar/>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/recording' element={<Recording/>} />
			</Routes>
		</div>
	);
}

export default App;

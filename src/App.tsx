import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";

function App() {
	return (
		<Router>
			<Routes>
				{/* Define the routes for your screens */}
				<Route path="/" element={<HomeScreen />} />
			</Routes>
		</Router>
	);
}

export default App;

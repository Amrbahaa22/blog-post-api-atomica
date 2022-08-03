import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Login from "./components/Login";
import Blogdetails from "./components/Blogdetails";

function App() {
	return (
		<div className="App">
			<div className="content">
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route path="/Create" element={<Create />} />
						<Route path="/blogs/:id" element={<Blogdetails />} />
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;

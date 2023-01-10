import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';

const App = () => (
	<Router>
		<Routes>
			<Route
				path="/"
				element={(
					<Home />
					)}
			/>
			<Route
				path="/login"
				element={(
					<Login />
					)}
			/>
			<Route
				path="/register"
				element={(
					<Register />
					)}
			/>
			<Route
				path="/*"
				element={(
					<ErrorPage />
					)}
			/>
		</Routes>
	</Router>

);

export default App;

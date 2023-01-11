/* eslint-disable @typescript-eslint/naming-convention */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useEffect, FC, useState } from 'react';

// import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';

import Footer from './components/Footer';

import { userLoginProps } from './PropsTypes';

const App: FC = () => {
  const [userLogin, setUserLogin] = useState<userLoginProps>({
    isConnected: false,
    login: '',
    token: '',
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserLogin(foundUser);
    }
  }, []);
  return (
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
					<Login userLogin={userLogin} setUserLogin={setUserLogin} />)}
			/>
			<Route
				path="/register"
				element={(
					<Register />
					)}
			/>
			{userLogin.isConnected && (
			<Route
				path="/profile"
				element={(
					<Profile login={userLogin.login || ''} />
						)}
			/>
			)}
			<Route
				path="/*"
				element={(
					<ErrorPage />
					)}
			/>
		</Routes>
		<br />
		<Footer setUserLogin={setUserLogin} />
	</Router>
  );
};

export default App;

import ReactDOM from 'react-dom/client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<App />
		<ToastContainer />
	</React.StrictMode>,
);

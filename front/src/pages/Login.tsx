import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userLoginProps, loginFormValueProps } from '../PropsTypes';

interface Props {
  userLogin: userLoginProps;
  setUserLogin: (userLogin: userLoginProps) => void;

}

const Login: FC<Props> = ({ userLogin, setUserLogin }) => {
  const [loginFormValue, setFormValue] = useState<loginFormValueProps>({ login: '', password: '' });

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const request = await axios({
        method: 'POST',
        url: 'http://localhost:4242/login',
        data: { ...loginFormValue },
      });
      if (request.status === 200) {
        const user = {
          isConnected: true,
          login: request.data.login,
          token: request.data.token,
        };
        localStorage.setItem('user', JSON.stringify(user));
        setUserLogin(user);
      }
    } catch (error) {
      toast.error(
        'login/password incorrect',
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...loginFormValue,
      [event.target.name]: event.target.value,
    });
  };
  if (userLogin.isConnected) {
    return <Navigate to="/profile" />;
  }

  return (
	<form onSubmit={handleSubmit}>
		<p>Login Form</p>
		<input
			type="login"
			name="login"
			placeholder="enter a login"
			value={loginFormValue.login}
			onChange={handleChange}
		/>
		<input
			type="password"
			name="password"
			placeholder="enter a password"
			value={loginFormValue.password}
			onChange={handleChange}
		/>
		<button
			type="submit"
		>
			Login
		</button>
	</form>
  );
};

export default Login;

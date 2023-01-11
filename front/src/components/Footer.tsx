import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { userLoginProps } from '../PropsTypes';

const Button = styled.button`
    text-decoration: none;
    background: #e55039aa;
    color: #ffffff;
    padding: 12px 24px;
    display: inline-block;
    border-radius: 25px;
    font-size: 14px;
    text-transform: uppercase;
    transition: 0.4s;
    &:hover { 
        background: #e55039;
    }
`;

interface FooterProps {
  setUserLogin: (userLogin: userLoginProps) => void;
}

const Footer: FC<FooterProps> = ({ setUserLogin }) => {
  const navigate = useNavigate();
  const disconnectHandler = () => {
    localStorage.clear();
    navigate('/');
    setUserLogin({ isConnected: false, login: '', token: '' });
  };
  return (
	<>
		<Button onClick={() => (navigate('/'))}>Go back home</Button>
		<Button onClick={() => disconnectHandler()}>Disconnect</Button>
	</>

  );
};

export default Footer;

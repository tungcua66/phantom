import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    color: #343434;
`;

const CustomH1 = styled.h1`
    font-size: 160px;
    margin: 0;
    font-weight: 900;
    letter-spacing: 20px;
`;

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

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
	<Container>
		<h2>Oops! Page not found.</h2>
		<CustomH1> 404 </CustomH1>
		<Button onClick={() => (navigate('/'))}>
			Go back home
		</Button>
	</Container>
  );
};

export default ErrorPage;

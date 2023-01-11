import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	height: 100vh;
  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  	align-items: center;
  	gap: 5px;
`;

const Button = styled.button<{ backgroundColor: string }>`
	background-color: ${({ backgroundColor }) => (backgroundColor)};
	width: 200px;
	height: 50px;
`;

const Home = () => {
  const navigate = useNavigate();
  return (
	<Container>
		<Button backgroundColor="red" onClick={() => (navigate('/login'))}>Login</Button>
		<Button backgroundColor="blue" onClick={() => (navigate('/register'))}>Register</Button>
	</Container>
  );
};

export default Home;

import styled from 'styled-components';

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

const ErrorPage = () => (
	<Container>
		<h2>Oops! Page not found.</h2>
		<CustomH1> 404 </CustomH1>
	</Container>
);

export default ErrorPage;

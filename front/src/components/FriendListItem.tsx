import styled from 'styled-components';
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
display: flex;
width: 200px;
heigth: 10px;
justify-content: space-around;
align-items: center;
border: 1px solid black
`;

const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-items: center;
align-items: center;
align-content: center;
`;

const DeleteButton = styled(FontAwesomeIcon)`
  &:hover {
    color: red;
  }
`;

interface Props {
  friend: {
    login: string;
    role: string;
  }
}

const FriendListItem: FC<Props> = ({ friend }) => (
	<Container>
		<InfoContainer>
			<h3>
				Name:
				{friend.login}
			</h3>
			<h4>
				role:
				{' '}
				{friend.role}
			</h4>
		</InfoContainer>
		<DeleteButton icon={faTrash} onClick={onClickHandler} />
	</Container>
);

export default FriendListItem;

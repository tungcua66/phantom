import { FC, useEffect } from 'react';
import axios from 'axios';

interface Props {
  login: string
}

const Profile: FC<Props> = ({ login }) => {
//   const [user, setUser] = useState();
  const getUserInfo = async () => {
    try {
      const request = await axios({
        method: 'POST',
        url: 'http://localhost:4242/profile/{login}',
      });
      if (request.status === 200) {
        return request.data;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    console.log('login', login);
    const res = getUserInfo();
    if (res) {
      console.log(res);
    }
  }, [login]);

  return (
	<>
		<h1>
			Bonjour
			{' '}
			{login}
		</h1>
		<h2>
			{' '}
			Your role is:
			{' '}
			{}
		</h2>

	</>
  );
};

export default Profile;

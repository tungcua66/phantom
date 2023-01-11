/* eslint-disable @typescript-eslint/naming-convention */
import { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  login: string
}

interface userProps {
  friends: Array<string>;
  role: string;
  login: string;

}

const Profile: FC<Props> = ({ login }) => {
  const [user, setUser] = useState<userProps | null>(null);

  useEffect(() => {
    console.log('login', login);
    const getUserInfo = async () => {
      try {
        const request = await axios({
          method: 'GET',
          url: `http://localhost:4242/profile/${login}`,
        });
        if (request.status === 200) {
          setUser(request.data);
        }
        return false;
      } catch (error) {
        return false;
      }
    };
    const bla = getUserInfo();
    console.log(bla);
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
			{user?.role}
		</h2>

	</>
  );
};

export default Profile;

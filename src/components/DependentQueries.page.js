import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;

  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId, // !! negation converts value to boolean
  });

  return <div>DependentQueries.page</div>;
};

/*

use정보 중 channelId 값 받아와서 다른 query 요청하는 로직

devtool 보면 제일 처음 ["courses", null] 의 state를 통해서 
network request 가 channelId값이 없어서 제일 처음에는 trigger 되지 않은 것을 알 수 있따 
*/

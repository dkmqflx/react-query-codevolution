import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const fetchSupserFriends = () => {
  return axios.get(`http://localhost:4000/friends`);
};

export const ParallelQueriesPage = () => {
  const { data: superHeroes } = useQuery('super-heroes', fetchSupserHeroes);
  const { data: friends } = useQuery('friends', fetchSupserFriends);

  return <div>ParallelQueriesPage</div>;
};

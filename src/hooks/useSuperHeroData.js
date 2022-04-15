import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroeData = (heroId) => {
  return useQuery(['super-hero', heroId], fetchSupserHero);
};

/*
() => fetchSupserHero(heroId)
이 방식으로 데이터 던져줄 수 도있다.
*/

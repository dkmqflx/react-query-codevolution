import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSupserHeroes, {
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

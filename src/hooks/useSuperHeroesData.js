import { useQuery, useMutation, useQueryClient } from 'react-query';
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

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries('super-heroes');
      // Add hero 버튼을 누르면 다시 Refetchig 한다
      // 즉, invalidating the query 하므로 react query 가 다시 refetch 하나느 것,
    },
  });
};

/*
이전 방법으로는 데이터를 post 요청한 다음 다시 refetch 해야 했지만
이 방법으로  post 요청이 성공한 후 다시 데이터를 자동으로 불러올수록 할 수 있다.
*/

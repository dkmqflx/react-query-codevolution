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
    onSuccess: (data) => {
      // data는 post request의 response
      // queryClient.invalidateQueries('super-heroes');

      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        // console.log('oldQueryData', oldQueryData); //  dev tools에서 Data Explorer에 해당하는 것

        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

/*
이전방법으로는 post 후 invalidate해서 다시 데이터를 get 요청으로 불러오지만 이렇게 하지말고 
post 요청 후 받은 데이터를 바로 기존에 존재하던 데이터에서 새롭게 업데이트할 수 있다.
즉 다시 isFetching이 true가 되지 않고 다시 get 요청을 하지 않는다.
*/

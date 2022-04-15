import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from '../utils/axios-utils';

const fetchSupserHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes');
  return request({ url: '/superheroes' });
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
  // return axios.post('http://localhost:4000/superheroes', hero);
  return request({ url: '/superheroes', method: 'post', data: hero });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    // data는 post request의 response
    // queryClient.invalidateQueries('super-heroes');
    // queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //   // console.log('oldQueryData', oldQueryData); //  dev tools에서 Data Explorer에 해당하는 것
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data],
    //   };
    // });
    // },

    // onMutate is called before th mutation function is fired
    // and is passed th same variables the mutation function would receive
    onMutate: async (newHero) => {
      // cancle any outgoing refetches so they don't overwirte out optimistic update
      await queryClient.cancelQueries('super-heroes');
      const previousHeroData = queryClient.getQueryData('super-heroes');
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero }],
        };
      });
      return { previousHeroData }; // thie will be used to roll back data in case of error
    },

    // if the mutations encounter error, function is called
    // 즉 잘못된 url로 요청하거나 하면, 새로운 목록에 데이터 추가되었다가,
    // onSettled 때문에 다시 refetching 되면서 새로운 목록에 추가된 데이터가 취소된다
    // 즉 client data와 server data의 sync가 맞게 된다.

    onError: (_err, _newTodo, context) => {
      console.log('context', context);
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },

    // if mutation is either successful or when it encounters an error
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
      // all we have to do is refetch superheroes
      // this will ensure client stats is in sync with server state
      // get 요청을 통해 서버로부터 다시 데이터를 불러온다
    },
  });
};

/*
Optimisitc update imply updating the state before perfoming a mutation under th assumption
that nothing can go wrong

// Add hero 누르면 새로운 데이터 추가되고 다시 refetching 된다.
*/

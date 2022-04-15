import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

/*
data fetching을 다루면서 side effect 발생하고 싶을 때 있다.
예를들어 모달창을 연다던가, 다른 라우트로 이동하거나 toast notification을 보여주는 것.

 */

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('Perform side deffect after data fetching', data);
  };

  const onError = (error) => {
    console.log('Perform side deffect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery('super-heroes', fetchSupserHeroes, {
    onSuccess: onSuccess,
    onError: onError,
  });
  console.log({ isLoading, isFetching });
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Fech Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

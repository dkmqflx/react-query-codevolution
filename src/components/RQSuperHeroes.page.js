import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

/*
  다시 마운트가 되지 않더라도 유저가 하는 이벤트를 통해서 데이터를 다시 fetch할 수 있다.
  enabled: false, 속성을 통해 데이터가 fetch되는 것을 막을 수 있다.
  그리고 useQuery의 refetch를 사용해서 이벤트가 발생할 때 마다 refetch할 수 있도록 한다.
  그리고 처음에는 isLoading이 true지만 다시데이터를 눌를 때는 캐시되기 때문에 isLoading이 false가 된다.
  즉, iseFetching만 true -> false로 바뀐다.

 */

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery('super-heroes', fetchSupserHeroes, {
    enabled: false,
  });
  console.log(isLoading, isFetching);
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

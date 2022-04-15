import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

/*
    default, refetchOnMount: true,

    컴포넌트가 마운트 될 때 마다 데이터를 fetching한다.
    즉 다른 페이지 이동했다가 다시 해당 페이지로 올 때마다 데이터 fetching한다.

    하지만 false로 두면 처음 페이지 방문 이후, 다시 페이지 방문해도 refetch하지 않는다 

    always로 값을 두면 query data가 stale이든 아니든 간에 항상 컴포넌트가 마운트 될 때 refetch한다.
    즉, statleTime이 설정되어 있어도 항상 refetch한다 .

    traditional한 방법, useEffect를 쓴 SupserHeroes 페이지에서, 데이터를 받아온 다음에, 
    db.json의 데이터를 바꾸어도 바꾼 데이터가 반영되지 않는다
    그 이유는 컴포넌트가 remote data가 바뀌었는지 알 수 없기 때문이다.
    새로고침, refresh를 할 때만 데이터가 바뀐다.

    하지만 리액트 쿼리를 사용하면 db.json의 데이터를 바꾸면 새로고침을 하지 않아도 바뀐 데이터가 반영되는데 
    그 이유가 바로 refetchOnWindowFocus 때문이다.
    default는 true이지만 만약 false로 두게되면 useEffect를 사용했을 때 처럼 데이터가 바뀌어도 반영이 되지 않는다
    그리고 always로 두면 stale이든 아니든 항상 refetch 한다.
    즉, statleTime이 설정되어 있고, true 값을 가지만 서버데이터가 바뀌어도 staleTime 동안은 다시 refetch하지 않는데,
    always로 두면 staleTime이 있어도 항상 refetch한다 .



 */

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSupserHeroes, {
    refetchOnWindowFocus: 'always',
    staleTime: 30000,
  });
  console.log(isLoading, isFetching);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

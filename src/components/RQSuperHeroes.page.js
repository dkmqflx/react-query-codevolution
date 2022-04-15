import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

/*
리액트 쿼리에서는 처음 해당 페이지로 이동하면 로딩 텍스트 보인다 
하지만 다른 페이지 갔다가 다시 해당 페이지로 와도 로딩텍스트가 보이지 않는다 
그 이유는 모든 쿼리 결과가 default로 5분 동안 캐시되기 때문이다.

'super-heroes',라는 query key로, 이게 캐시 되었는지 확인한다.
그리고 캐시되었다면 isLoding 없이 데이터를 return 한다 

console.log(isLoading); 로 찍어보면, 
처음이동할 때는 true -> false 지만
그 다음에 이동할 때는 false가 찍힌다

하지만 서버에서 받아오는 데이터가 update 되면 다시 fetching해서 데이터를 보여준다 
console.log(isLoading, isFetching);
처음에는 true, true -> false, false 가 찍히지만
데이터가 업데이트 되면, false, true -> false, fasle가 찍힌다.
그렇기 때문에 로딩 텍스트는 보이지 않고 업데이트된 데이터만 보여주게 된다.


const { isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSupserHeroes, {
  cacheTime: 5000,
});

이렇게 세번째 argument로 캐쉬 타임을 설정할 수 있다.
이렇게 하면 5초 뒤 캐쉬된 'super-heroes'가 없어진다

만약 데이터가 자주 바뀌는 것이 아니라면 stale time을 설정해서, fetching이 되는 것을 막을 수 있다.
다른 페이지로 이동하고 다시 돌아와도 isLoading은 false지만, isFetching은 true이지만, 

cachedTime을 default로 5분, statleTime을 30초으로 설정하면 30초 동안은 다시 데이터를 받아오지 않는다

const { isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSupserHeroes, {
  staleTime: 30000,
});


console.log(isLoading, isFetching);
처음에는 true, true -> false, false 가 찍히고
그 다음에도 false, false -> false, fasle가 찍힌다.

devtool에서는 fresh flag가 30초 활성화 되는 것을 확인할 수 있다
30초가 지나면 fresh flag 대신 stale flag가 활성화 된다
그 다음 다시 다른 페이지 갔다가 해당 페이지 이동하면 다시 isFetching이 true가 되고 데이터를 다시 받아오게 된다

default staleTime은 0

 */

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSupserHeroes, {
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

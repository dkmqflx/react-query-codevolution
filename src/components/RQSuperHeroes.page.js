import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSupserHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

/*
   Polling : refers to the process of fetching data at regular intervals
   예를 들어 실시간 주가를 보여준다고 할 때, ui는 항상 remote data와 sync되어 있어야 한다.
   리액트 쿼리에서는 refetchInterval속성으로 이것을 설정할 수 있다. default:false 지만
   milliseond로 설정하면 해당 시간마다 데이터를 계소개서 refetch한다 
   예를들어, refetchInterval: 5000로 설정하면 5초마다 데이터를 받아온다.

   polling이나 automatic refetching은 window loses일 때 멈추게 된다.
   하지만 refetchIntervalInBackground를 true로 주면 윈도우에 포커스가 없어도 refetch하기 때문에 
   따라서 refetchInterval과 refetchIntervalInBackground 속성을 통해서 더 나은 사용자 경험을 제공할 수 있다



 */

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSupserHeroes, {
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
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

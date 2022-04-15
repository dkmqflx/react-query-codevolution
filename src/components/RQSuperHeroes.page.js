import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

/*
같은 쿼리가 다른 컴포넌트에서 사용될 수 있는데 이러한 상황을 custom query hook을 사용해서 해결할 수 있다.

 */

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('Perform side deffect after data fetching', data);
  };

  const onError = (error) => {
    console.log('Perform side deffect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);

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
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};

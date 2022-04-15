import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchColors = ({ pageParam = 1 }) => {
  // getNextPageParam로 return 된 값이 온다
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  const { isLoading, isError, error, data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(['colors'], fetchColors, {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
        // return 값에 따라 true or false로 hasNextPage 가 된다.
      },
    });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  console.log('isFetching', isFetching);
  console.log('isFetchingNextPage', isFetchingNextPage);

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      {/* page의 포커스를 벗어났다가 다시 돌아오는 경우 , isFetching은 true가 되기 때문에 'Fetching...'이 출력된다 
      
      isFetching - In any state, if the query is fetching at any time (including background refetching) isFetching will be true.

      The isFetchingNextPage and isFetchingPreviousPage booleans are now available to distinguish
       between a background refresh state and a loading more state
      
      */}
    </>
  );
};

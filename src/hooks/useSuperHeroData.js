import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient(); // App.js에 있는 QueryClient를 사용할 수 있다.
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};

/*
rq-super-hero 페이지에서 hero에 대한 정보를 캐시 했기 때문에, 
loading 없이 initial data가 있으면 보여줄 수 있다.
즉, 이 경우에는 loading은 false 지만 fetching은 true로 데이터를 새로 fetch 해온다
헤당 페이지에서 새로고침하면 캐시된 것이 없기 때문에 loading이 보인다 


  RQSuperHeroPage 컴포넌트에서 {data?.data.name} - {data?.data.alterEgo}로 값을 보여주기 때문에 
  때문에 { data: hero }; 로 전달

*/

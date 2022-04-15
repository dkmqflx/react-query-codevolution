import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSupserHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSupserHero(id),
      };
    })
  );
  console.log({ queryResults });
  return <div>DynamicParallelPage</div>;
};

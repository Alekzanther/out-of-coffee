import { useQuery } from '@apollo/client';
import { getItemsQuery } from '../../apollo-client/queries/getItems/getItems';

const Items = () => {
  const { data, loading } = useQuery(getItemsQuery);
  console.log('data', data);
  console.log('loading', loading);
  if (data) {
    return (
      <div>
        <ul>
          {data.GetItems.map((item) => (
            <li>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <div>Loading......</div>;
};

export default Items;

import styled from 'styled-components';
import { useGetItemsQuery } from '../../apollo-generated/client-graphql';
import { aggregateItems } from '../../helpers/aggregateItems';

// ADD, REMOVE PRODUCTS TO CHOOSE FROM IN THE OTHER VIEW
// LIST AVAILABLE STUFF

const ListItem = styled('li')`
  display: flex;
  flex-direction: row;
`;

const Spacer = styled('span')`
  padding-left: 5px;
  padding-right: 5px;
`;

const Products = () => {
  const { data, loading } = useGetItemsQuery();
  console.log('data', data);
  console.log('loading', loading);

  if (data) {
    return (
      <div>
        <ul>
          {data.GetItems.map((item) => (
            <ListItem>
              <div>{item.name}</div>
            </ListItem>
          ))}
        </ul>
      </div>
    );
  }
  return <div>Loading......</div>;
};

export default Products;

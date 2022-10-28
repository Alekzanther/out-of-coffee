import styled from 'styled-components';
import {
  useAddItemToOrderMutation,
  useGetItemsQuery,
} from '../../apollo-generated/client-graphql';

const ItemsList = styled('ul')`
  width: 50%;
`;

export const Items = () => {
  const { data } = useGetItemsQuery();
  const [addItem] = useAddItemToOrderMutation();
  const handleAddItemToOrder = (id) => addItem({ variables: { id } });

  return (
    <ItemsList>
      {data &&
        data.GetItems.map((item) => {
          return (
            <li>
              {item.name} -{' '}
              <button onClick={() => handleAddItemToOrder(item._id)}>
                Add to Order
              </button>
            </li>
          );
        })}
    </ItemsList>
  );
};

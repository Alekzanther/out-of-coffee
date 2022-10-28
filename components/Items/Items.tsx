import styled from 'styled-components';
import {
  useAddItemToOrderMutation,
  useGetItemsQuery,
  useSetFavoriteMutation,
} from '../../apollo-generated/client-graphql';
import { AnimatedButton } from '../AnimatedButton';

const ItemsList = styled('ul')`
  width: 50%;
`;

export const Items = () => {
  const { data } = useGetItemsQuery();
  const [addItem] = useAddItemToOrderMutation();
  const [setFavorite] = useSetFavoriteMutation();
  const handleAddItemToOrder = (id) => addItem({ variables: { id } });
  const handleAddToFavorites = (id) =>
    setFavorite({ variables: { id } });

  return (
    <ItemsList>
      {data &&
        data.GetItems.map((item) => {
          return (
            <li key={item._id} style={{ display: 'flex' }}>
              <AnimatedButton
                isToggled={item.isFavorite}
                kind="outlineHeartToFilledHeart"
                onClick={() => handleAddToFavorites(item._id)}
              />
              {item.name} -
              <button onClick={() => handleAddItemToOrder(item._id)}>
                Add to Order
              </button>
            </li>
          );
        })}
    </ItemsList>
  );
};

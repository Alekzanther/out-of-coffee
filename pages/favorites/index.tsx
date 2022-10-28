// MANAGE FAVORITES
// They are still displayed along with all other items in products view, but here you can list them all and unfavorite them
// But you can still add favorites in any other view

import {
  useGetFavoriteItemsQuery,
  useSetFavoriteMutation,
} from '../../apollo-generated/client-graphql';
import { AnimatedButton } from '../../components/AnimatedButton';

const Favorites = () => {
  const { data, error, loading } = useGetFavoriteItemsQuery();
  const [setFavorite, { data: data2 }] = useSetFavoriteMutation();
  console.log('data', data);
  console.log('loading', loading);
  console.log('data2', data2);
  if (error) {
    return <div>{error.message}</div>;
  }
  if (data) {
    return (
      <div>
        <ul>
          {data.GetFavoriteItems.map((item) => (
            <li key={item._id}>
              {item.name}
              <AnimatedButton
                kind="outlineHeartToFilledHeart"
                isToggled={item.isFavorite}
                onClick={() =>
                  setFavorite({ variables: { id: item._id } })
                }
              ></AnimatedButton>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <div>Loading......</div>;
};

export default Favorites;

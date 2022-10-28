// MANAGE FAVORITES
// They are still displayed along with all other items in products view, but here you can list them all and unfavorite them
// But you can still add favorites in any other view

import React from 'react';
import {
  useGetFavoriteItemsQuery,
  useSetFavoriteMutation,
} from '../../apollo-generated/client-graphql';
import { AnimatedButton } from '../../components/AnimatedButton';

const Favorites = () => {
  const { data: getFavoritesData, error } =
    useGetFavoriteItemsQuery();
  const [setFavorite] = useSetFavoriteMutation();

  if (error) {
    return <div>{error.message}</div>;
  }
  if (getFavoritesData) {
    return (
      <div>
        <ul>
          {getFavoritesData.GetFavoriteItems.map((item) => (
            <React.Fragment key={item._id}>
              {item.isFavorite && (
                <li key={item._id} style={{ display: 'flex' }}>
                  <AnimatedButton
                    kind="outlineHeartToFilledHeart"
                    isToggled={item.isFavorite}
                    onClick={() =>
                      setFavorite({ variables: { id: item._id } })
                    }
                  />
                  {item.name}
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }
  return <div>Loading......</div>;
};

export default Favorites;

import { useGetFavoriteItemsQuery } from '../../apollo-generated/client-graphql';
import { BorderCard } from '../BorderCard/BorderCard';
import { SimpleList } from '../SimpleList';

export const FavoritesList = () => {
  const { data } = useGetFavoriteItemsQuery();
  const favorites = data?.GetFavoriteItems || [];

  return (
    <BorderCard subTitle="Favoriter" style={{ width: '600px' }}>
      <div>
        <h2>Favoriter</h2>
        {favorites.length > 0 &&
          favorites.map((item, index) => (
            <SimpleList
              amount={2}
              name="hek"
              removeItem={() => {}}
              title={item.name}
              // newItem={item.new}
              id={item._id}
              key={index}
            />
          ))}
      </div>
    </BorderCard>
  );
};

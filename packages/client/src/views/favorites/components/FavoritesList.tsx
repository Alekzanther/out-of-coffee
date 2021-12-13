/** @jsxImportSource @emotion/react */

import { BorderCard, SimpleList } from 'components';
import { useGetFavoriteItemsQuery } from 'generated/graphql';

import { listWrapperStyle } from '../styles';

export const FavoritesList = () => {
  const { data } = useGetFavoriteItemsQuery();
  const favorites = data?.GetFavoriteItems || [];
  console.log('rerender me', favorites);

  return (
    <BorderCard subTitle="Favoriter" style={{ width: '600px' }}>
      <div css={listWrapperStyle}>
        <h2>Favoriter</h2>
        {favorites.length > 0 &&
          favorites.map((item, index) => (
            <SimpleList
              title={item.name}
              // newItem={item.new}
              key={index}
            />
          ))}
      </div>
    </BorderCard>
  );
};

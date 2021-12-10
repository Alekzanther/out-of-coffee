/** @jsxImportSource @emotion/react */
import { wrapperStyle } from '../styles';

import { BaseOrderList } from './BaseOrderList';
import { FavoritesList } from './FavoritesList';

export const Favorites = () => {
  return (
    <div css={wrapperStyle}>
      <BaseOrderList />
      <FavoritesList />
    </div>
  );
};

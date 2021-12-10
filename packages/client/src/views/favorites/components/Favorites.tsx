/** @jsxImportSource @emotion/react */
import { wrapperStyle } from '../styles';

import { BaseOrdersList } from './BaseOrdersList';
import { FavoritesList } from './FavoritesList';

export const Favorites = () => {
  return (
    <div css={wrapperStyle}>
      <BaseOrdersList />
      <FavoritesList />
    </div>
  );
};

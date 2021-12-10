/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

import { SimpleList } from '../../components';
import { BaseOrdersList } from './BaseOrdersList';

type FavoriteItem = {
  title: string;
  new: boolean;
};

const favoriteItems: FavoriteItem[] = [
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: true },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
];

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const listWrapperStyle = css`
  max-height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

export const Favorites: React.FC = () => {
  return (
    <div css={wrapperStyle}>
      <div css={listWrapperStyle}>
        <h2>Favoriter</h2>
        {favoriteItems.map((item, index) => (
          <SimpleList
            title={item.title}
            newItem={item.new}
            key={index}
          />
        ))}
      </div>
      <BaseOrdersList />
    </div>
  );
};

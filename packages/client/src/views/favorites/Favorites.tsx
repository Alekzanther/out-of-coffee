/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

import { SimpleList } from '../../components';
import { useGetBaseOrderQuery } from 'generated/graphql';

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

const baseorderItems: FavoriteItem[] = [
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: true },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
  { title: 'Honung, 250 gram', new: false },
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

const listWrapperStyle = css`
  max-height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

export const Favorites: React.FC = () => {
  const { data } = useGetBaseOrderQuery();

  const items = data?.GetBaseOrder?.items || [];

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
      <div css={listWrapperStyle}>
        <h2>Basorder</h2>
        <ul style={{ listStyle: 'none' }}>
          {items.length >= 1
            ? items.map((item, index) => (
                <li key={index}>
                  <p>{item?.name}</p>
                  {item?.productImageUrl && (
                    <img
                      style={{ height: '20px', width: '400px' }}
                      src={item?.productImageUrl}
                      alt={item.name}
                    />
                  )}
                  {item?.productUrl && (
                    <a
                      style={{
                        textDecoration: 'none',
                      }}
                      href={item?.productUrl}
                    >
                      Gå till skiten
                    </a>
                  )}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

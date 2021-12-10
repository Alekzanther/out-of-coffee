/** @jsxImportSource @emotion/react */

import { SimpleList } from 'components';

import { listWrapperStyle } from '../styles';

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

export const FavoritesList = () => {
  return (
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
  );
};

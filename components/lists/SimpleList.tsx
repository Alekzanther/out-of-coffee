import React, { forwardRef } from 'react';
import { css } from 'styled-components';
import New from '../../assets/new.svg';

type SimpleListItem = {
  title: string;
  newItem?: boolean;
  id: string;
  amount: number;
  name: string;
  productImageUrl?: string | null;
  removeItem: (id: string) => void;
};

const style = css`
  display: flex;
  align-items: center;
  padding: 11px 0;
  position: relative;
  justify-content: space-between;

  svg {
    position: absolute;
    left: -30px;
  }
`;

const spanStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SimpleList = forwardRef<HTMLDivElement, SimpleListItem>(
  (
    { title, newItem, id, amount, name, productImageUrl, removeItem },
    ref,
  ) => {
    const handleRemoveItem = () => {
      removeItem(id);
    };
    return (
      <div ref={ref} id={id}>
        <span>
          {newItem ? <New /> : null}
          <img
            style={{ height: '50px', width: '50px' }}
            src={productImageUrl || ''}
            alt={name}
          />
          <p>{title}</p>
        </span>
        <button onClick={handleRemoveItem}>Ta bort</button>
        <p>{amount}</p>
      </div>
    );
  },
);

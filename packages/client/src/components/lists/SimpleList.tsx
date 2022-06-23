/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
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
      <div ref={ref} id={id} css={style}>
        <span css={spanStyle}>
          {newItem ? <New /> : null}
          <img
            style={{ height: '50px', width: '50px' }}
            src={productImageUrl || ''}
            alt={name}
          />
          <p
            css={(theme) => ({
              color: newItem
                ? theme.colors.greenLantern
                : theme.colors.pitchBlack,
            })}
          >
            {title}
          </p>
        </span>
        <button onClick={handleRemoveItem}>Ta bort</button>
        <p>{amount}</p>
      </div>
    );
  },
);

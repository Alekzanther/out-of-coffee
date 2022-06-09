/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import New from '../../assets/new.svg';

type SimpleListItem = {
  title: string;
  newItem?: boolean;
  id: string;
  amount: number;
};

const style = css`
  display: flex;
  align-items: center;
  padding: 11px 0;
  position: relative;

  svg {
    position: absolute;
    left: -30px;
  }
`;

export const SimpleList = forwardRef<HTMLDivElement, SimpleListItem>(
  ({ title, newItem, id, amount }, ref) => {
    return (
      <div ref={ref} id={id} css={style}>
        {newItem ? <New /> : null}
        <p
          css={(theme) => ({
            color: newItem
              ? theme.colors.greenLantern
              : theme.colors.pitchBlack,
          })}
        >
          {title}
        </p>
        <p>{amount}</p>
      </div>
    );
  },
);

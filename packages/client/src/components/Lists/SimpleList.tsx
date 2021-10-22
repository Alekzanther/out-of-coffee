/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { ReactComponent as New } from '../../assets/new.svg';

type SimpleListItem = {
  title: string;
  newItem: boolean;
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

export const SimpleList: React.FC<SimpleListItem> = ({
  title,
  newItem,
}) => {
  return (
    <div css={style}>
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
    </div>
  );
};

/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { AnimatedButton } from '../animated-button';

type ComplicatedListItem = {
  title: string;
  newItem?: boolean;
  iLoveIt?: () => void;
  throwItInTheTrash?: () => void;
  incrementAndDecrementItems?: () => number;
};

const style = css`
  display: flex;
  align-items: center;
  padding: 11px 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  svg {
    position: absolute;
    left: -30px;
  }
`;

const actionsContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const incrementContainerStyles = css`
  display: flex;
  align-items: center;
`;

export const ComplicatedList: React.FC<ComplicatedListItem> = ({
  title,
  newItem,
  iLoveIt,
  throwItInTheTrash,
  incrementAndDecrementItems,
}) => {
  const [numberOfItems, setNumberOfItems] = useState(0);
  return (
    <div css={style}>
      <p
        css={(theme) => ({
          color: newItem
            ? theme.colors.greenLantern
            : theme.colors.pitchBlack,
        })}
      >
        {title}
      </p>
      <div css={actionsContainer}>
        {incrementAndDecrementItems && (
          <div css={incrementContainerStyles}>
            <button
              onClick={() =>
                setNumberOfItems((prevCount) =>
                  Math.min(0, --prevCount),
                )
              }
            >
              -
            </button>
            <p>{numberOfItems}</p>
            <button
              onClick={() =>
                setNumberOfItems((prevCount) => ++prevCount)
              }
            >
              +
            </button>
          </div>
        )}
        {throwItInTheTrash && (
          <div css={incrementContainerStyles}>Trash</div>
        )}
        {iLoveIt && (
          <div css={incrementContainerStyles}>
            <AnimatedButton kind="outlineHeartToFilledHeart" />
          </div>
        )}
      </div>
    </div>
  );
};

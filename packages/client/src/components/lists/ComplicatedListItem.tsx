/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

import { AnimatedButton } from '../animated-button';
import New from '../../assets/new.svg';
import Trashcan from '../../assets/trashcan.svg';
import { Item, useSetFavoriteMutation } from 'generated/graphql';

type ComplicatedListItemProps = {
  item: Item;
  newItem?: boolean;
  throwItInTheTrash?: () => void;
  incrementAndDecrementItems?: () => number;
};

const style = css`
  display: flex;
  align-items: center;
  padding: 11px 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
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

const nakedButtonStyles = css`
  background: none;
  color: inherit;
  border: 1px solid transparent;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &:focus-visible {
    border: solid 1px hotpink;
    border-radius: 5px;
  }
`;

const linkStyle = css`
  padding-right: 14px;
  text-decoration: 'none';
`;

export const ComplicatedListItem: React.FC<
  ComplicatedListItemProps
> = ({
  item,
  newItem,
  throwItInTheTrash,
  incrementAndDecrementItems,
}) => {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [setFave] = useSetFavoriteMutation({
    variables: {
      id: item._id,
      value: Boolean(item.isFavorite),
    },
  });

  const increaseCount = () => {
    setNumberOfItems((prevCount) => ++prevCount);
  };

  const decreaseCount = () => {
    setNumberOfItems((prevCount) => {
      const newCount = prevCount - 1;
      return Math.max(newCount, 0);
    });
  };

  const setFavorite = () => {
    setFave();
  };

  return (
    <div css={style}>
      {newItem ? <New /> : null}
      {item?.productImageUrl ? (
        <a
          css={linkStyle}
          href={item?.productUrl}
          target="_blank"
          rel="noreferrer"
        >
          <img
            style={{ height: '50px', width: '50px' }}
            src={item?.productImageUrl}
            alt={item.name}
          />
        </a>
      ) : (
        <>
          {item?.productUrl && (
            <a css={linkStyle} href={item?.productUrl}>
              {`Gå till ${item.name}`}
            </a>
          )}
        </>
      )}
      <p
        css={(theme) => ({
          color: newItem
            ? theme.colors.greenLantern
            : theme.colors.pitchBlack,
        })}
      >
        {item.name}
      </p>
      <div css={actionsContainer}>
        {!incrementAndDecrementItems && (
          <div css={incrementContainerStyles}>
            <button
              aria-label="decrease"
              css={nakedButtonStyles}
              onClick={decreaseCount}
            >
              -
            </button>
            <p
              aria-label={`${numberOfItems} ${item.name}`}
              tabIndex={0}
            >
              {numberOfItems}
            </p>
            <button
              aria-label="increase"
              css={nakedButtonStyles}
              onClick={increaseCount}
            >
              +
            </button>
          </div>
        )}
        {throwItInTheTrash && (
          <div css={incrementContainerStyles}>
            <button
              type="button"
              css={nakedButtonStyles}
              aria-label="remove"
            >
              <Trashcan style={{ cursor: 'pointer' }} />
            </button>
          </div>
        )}
        <div css={incrementContainerStyles}>
          <AnimatedButton
            kind="outlineHeartToFilledHeart"
            onClick={setFavorite}
            ariaLabel="favorite"
            isToggled={item.isFavorite}
          />
        </div>
      </div>
    </div>
  );
};

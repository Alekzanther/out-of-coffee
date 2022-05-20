/** @jsxImportSource @emotion/react */
import { useCallback, useState, forwardRef } from 'react';
import { css } from '@emotion/react';

import { AnimatedButton } from '../animated-button';
import New from '../../assets/new.svg';
import Trashcan from '../../assets/trashcan.svg';
import { Item, useSetFavoriteMutation } from 'generated/graphql';
import { NodeType } from 'views';

type ComplicatedListItemProps = {
  item: Item;
  newItem?: boolean;
  throwItInTheTrash?: () => void;
  incrementAndDecrementItems?: () => number;
  id: string;
  setSelectedProduct: (
    id: string,
    position: string[],
    item: Item,
  ) => void;
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

export const ComplicatedListItem = ({
  item,
  newItem,
  throwItInTheTrash,
  incrementAndDecrementItems,
  id,
  setSelectedProduct,
}: ComplicatedListItemProps) => {
  const [setFave] = useSetFavoriteMutation({
    variables: {
      id: item._id,
      value: Boolean(item.isFavorite),
    },
  });

  const [position, setPosition] = useState<string[]>([]);
  // console.log('position', position);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const x = node.getBoundingClientRect().x;
      const y = node.getBoundingClientRect().y;
      setPosition([x.toString(), y.toString()]);
    }
  }, []);

  const setFavorite = () => {
    setFave();
  };

  const handleOnAdd = () => {
    setSelectedProduct(id, position, item);
  };

  return (
    <div id={id} css={style}>
      {newItem ? <New /> : null}
      {item?.productImageUrl ? (
        <a
          css={linkStyle}
          href={item?.productUrl}
          target="_blank"
          rel="noreferrer"
        >
          <img
            ref={measuredRef}
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
        {/* {!incrementAndDecrementItems && (
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
        )} */}
        <button onClick={handleOnAdd}>Lägg till</button>
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

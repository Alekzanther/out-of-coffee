import { useCallback, useState, forwardRef } from 'react';

import { AnimatedButton } from '../AnimatedButton';
import New from '../../assets/new.svg';
import Trashcan from '../../assets/trashcan.svg';
// import { Item, useSetFavoriteMutation } from 'generated/graphql';
// import { NodeType } from 'views';
import styled, { css } from 'styled-components';
import {
  Item,
  useSetFavoriteMutation,
} from '../../apollo-generated/client-graphql';

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

const ActionsContainer = styled.div(
  () => css`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
  `,
);

const IncrementContainerStyles = styled.div(
  () => css`
    display: flex;
    align-items: center;
  `,
);

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

  const measuredRef = useCallback((node: HTMLImageElement) => {
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
    <div id={id}>
      {newItem ? <New /> : null}
      {item?.productImageUrl ? (
        <a href={item?.productUrl} target="_blank" rel="noreferrer">
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
            <a href={item?.productUrl}>{`Gå till ${item.name}`}</a>
          )}
        </>
      )}
      <p>{item.name}</p>
      <ActionsContainer>
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
          <IncrementContainerStyles>
            <button type="button" aria-label="remove">
              <Trashcan style={{ cursor: 'pointer' }} />
            </button>
          </IncrementContainerStyles>
        )}
        <IncrementContainerStyles>
          <AnimatedButton
            kind="outlineHeartToFilledHeart"
            onClick={setFavorite}
            ariaLabel="favorite"
            isToggled={item.isFavorite}
          />
        </IncrementContainerStyles>
      </ActionsContainer>
    </div>
  );
};

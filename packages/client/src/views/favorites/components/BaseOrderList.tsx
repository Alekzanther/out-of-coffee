/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BorderCard } from 'components';
import { Item, useGetBaseOrderQuery } from 'generated/graphql';
import { getAmountOfItemsInOrder } from 'helpers/getAmountOfItemsInOrder';

import { listWrapperStyle } from '../styles';

const listItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const listStyle = css`
  list-style: none;
  padding-right: 1em;
`;

const nestedList = css`
  display: flex;
  min-width: 120px;
  justify-content: space-between;
`;

export const BaseOrderList = () => {
  const { data } = useGetBaseOrderQuery();

  const items = data?.GetBaseOrder?.items || [];

  const actualItems = getAmountOfItemsInOrder(items as Item[]);

  return (
    <BorderCard subTitle="Basorder" style={{ width: '600px' }}>
      <div css={listWrapperStyle}>
        <h2>Basorder</h2>
        <ul css={listStyle}>
          {items.length >= 1
            ? actualItems.map((item, index) => (
                <li key={index}>
                  <div css={listItemStyle}>
                    <p style={{ flexGrow: 2 }}>{item?.name}</p>
                    <div css={nestedList}>
                      {item?.productImageUrl ? (
                        <a
                          style={{
                            textDecoration: 'none',
                          }}
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
                            <a
                              style={{
                                textDecoration: 'none',
                              }}
                              href={item?.productUrl}
                            >
                              {`Gå till ${item.name}`}
                            </a>
                          )}
                        </>
                      )}
                      <div>{item.amount}</div>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </BorderCard>
  );
};

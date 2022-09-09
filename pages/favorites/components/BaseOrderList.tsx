import styled, { css } from 'styled-components';
import {
  useGetBaseOrderQuery,
  Item,
} from '../../../apollo/generated/graphql';
import { BorderCard } from '../../../components';
import { getAmountOfItemsInOrder } from '../../../helpers/getAmountOfItemsInOrder';
// import { BorderCard } from 'components';
// import { Item, useGetBaseOrderQuery } from 'generated/graphql';
// import { getAmountOfItemsInOrder } from 'helpers/getAmountOfItemsInOrder';

import { listWrapperStyle } from '../styles';

const ListItemStyle = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
);

const ListStyle = styled.ul(
  () => css`
    list-style: none;
    padding-right: 1em;
  `,
);

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
      <div>
        <h2>Basorder</h2>
        <ListStyle>
          {items.length >= 1
            ? actualItems.map((item, index) => (
                <ListItemStyle key={index}>
                  <div>
                    <p style={{ flexGrow: 2 }}>{item?.name}</p>
                    <div>
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
                </ListItemStyle>
              ))
            : null}
        </ListStyle>
      </div>
    </BorderCard>
  );
};

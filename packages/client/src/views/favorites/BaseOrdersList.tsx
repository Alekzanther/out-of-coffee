/** @jsxImportSource @emotion/react */
import { useGetBaseOrderQuery } from 'generated/graphql';

import { listWrapperStyle } from '.';

export const BaseOrdersList = () => {
  const { data } = useGetBaseOrderQuery();

  const items = data?.GetBaseOrder?.items || [];

  return (
    <div css={listWrapperStyle}>
      <h2>Basorder</h2>
      <ul style={{ listStyle: 'none' }}>
        {items.length >= 1
          ? items.map((item, index) => (
              <li key={index}>
                <p>{item?.name}</p>
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
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

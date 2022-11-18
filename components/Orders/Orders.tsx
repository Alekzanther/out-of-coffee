import { useState } from 'react';
import {
  useGetCurrentOrderQuery,
  useRemoveItemFromOrderMutation,
  useGetBaseOrderLazyQuery,
} from '../../apollo-generated/client-graphql';
import { aggregateItems } from '../../helpers/aggregateItems';

export const Order = () => {
  const { data: currentOrderData } = useGetCurrentOrderQuery();
  const [getBaseOrder, { data: baseOrderData }] =
    useGetBaseOrderLazyQuery();
  const [showBaseOrder, setShowBaseOrder] = useState(false);
  console.log({ baseOrderData, currentOrderData });
  const aggregatedItems = aggregateItems(
    showBaseOrder && baseOrderData?.getBaseOrder?.items
      ? baseOrderData?.getBaseOrder.items
      : currentOrderData?.GetCurrentOrder.items || [],
  );

  const toggleShowBaseOrder = () => {
    getBaseOrder();
    setShowBaseOrder((prevState) => !prevState);
  };

  const [removeItem] = useRemoveItemFromOrderMutation();

  const handleRemoveItemFromOrder = (id: string) =>
    removeItem({ variables: { id } });

  return (
    <div>
      <>
        <button onClick={toggleShowBaseOrder}>show base order</button>
        {aggregatedItems && (
          <>
            {!showBaseOrder ?? (
              <>
                <h2>{currentOrderData.GetCurrentOrder.status}</h2>
                <h2>
                  Created:
                  {new Date(
                    currentOrderData.GetCurrentOrder.creationDate,
                  ).toISOString()}
                </h2>
              </>
            )}
            <h2>Items</h2>
            <ul>
              {aggregatedItems.map((item) => {
                return (
                  <li key={item._id}>
                    {item.name} - {item.amount} -{' '}
                    <button
                      onClick={() =>
                        handleRemoveItemFromOrder(item._id)
                      }
                    >
                      Remove Item
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </>
    </div>
  );
};

import {
  useGetCurrentOrderQuery,
  useRemoveItemFromOrderMutation,
} from '../../apollo-generated/client-graphql';
import { aggregateItems } from '../../helpers/aggregateItems';

export const Order = () => {
  const { data } = useGetCurrentOrderQuery();
  const aggregatedItems = aggregateItems(
    data?.GetCurrentOrder.items || [],
  );

  const [removeItem] = useRemoveItemFromOrderMutation();

  const handleRemoveItemFromOrder = (id: string) =>
    removeItem({ variables: { id } });

  return (
    <div>
      <>
        {data && (
          <>
            <h2>{data.GetCurrentOrder.status}</h2>
            <h2>
              Created:
              {new Date(
                data.GetCurrentOrder.creationDate,
              ).toISOString()}
            </h2>
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

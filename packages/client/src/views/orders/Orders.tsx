import {
  BorderCard,
  ComplicatedListItem,
  SimpleList,
} from 'components';
import {
  GetItemsQuery,
  GetOrdersQuery,
  useGetItemsQuery,
  useGetOrdersQuery,
} from 'generated/graphql';
import { getLatestOrder } from 'helpers/getLatestOrder';

import styles from './Orders.module.css';

export const Orders = () => {
  const { data: items, error: itemsError } = useGetItemsQuery();
  const { data: orders, error: ordersError } = useGetOrdersQuery();

  if (itemsError || ordersError) {
    return <div>Error</div>;
  }
  if (!items || !orders) {
    return <div>no data</div>;
  }
  if (orders && items) {
    return <OrdersContent orders={orders} items={items} />;
  }
  return <div></div>;
};

type OrdersContentProps = {
  items: GetItemsQuery;
  orders: GetOrdersQuery;
};

export const OrdersContent = (props: OrdersContentProps) => {
  const [currentOrder] = getLatestOrder(props?.orders.GetOrders);

  return (
    <div className={styles.ordersContainer}>
      <BorderCard subTitle="Produkter" style={{ width: '400px' }}>
        {props.items?.GetItems?.map((item) => (
          <ComplicatedListItem key={item._id} title={item.name} />
        ))}
      </BorderCard>
      <button> Lägg till ny vara </button>
      <BorderCard
        title="Nästa order"
        subTitle={new Date(currentOrder.endDate).toDateString()}
        style={{ width: '400px' }}
      >
        {currentOrder.items.map((item) => (
          <SimpleList key={item._id} title={item.name} />
        ))}
        <br />
      </BorderCard>
    </div>
  );
};

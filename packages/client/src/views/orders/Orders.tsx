import { Dialog } from 'components/dialog';
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
import { useCallback, useEffect, useState } from 'react';

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

export type NodeType = {
  id: string;
  x: number;
  y: number;
};

export const OrdersContent = (props: OrdersContentProps) => {
  const [currentOrder] = getLatestOrder(props?.orders.GetOrders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentNodes, setCurrentNodes] = useState<NodeType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [matchingNode, setMatchingNode] = useState<NodeType>();

  console.log('currentNodes', currentNodes);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const x = node.getBoundingClientRect().x;
      const y = node.getBoundingClientRect().y;
      const id = node.id;
      setCurrentNodes((prevNodes) => [...prevNodes, { id, x, y }]);
    }
  }, []);

  useEffect(() => {
    const matchingNode = currentNodes.find(
      (n) => n.id === selectedProduct,
    );
    console.log(matchingNode);
    if (matchingNode) {
      console.log('matchingNode', matchingNode);
      setMatchingNode(matchingNode);
    }
  }, [selectedProduct]);

  const handleCoolAnimation = (id: string) => {
    return setSelectedProduct(id);
  };
  // console.log('selectedProduct', selectedProduct);
  return (
    <div className={styles.ordersContainer}>
      <BorderCard subTitle="Produkter" style={{ width: '400px' }}>
        {props.items?.GetItems?.map((item) => (
          <ComplicatedListItem
            id={item._id}
            key={item._id}
            item={item}
            ref={measuredRef}
            setSelectedProduct={handleCoolAnimation}
            transform={matchingNode}
          />
        ))}
      </BorderCard>
      <button type="button" onClick={() => setDialogOpen(true)}>
        Lägg till ny vara
      </button>
      <BorderCard
        title="Nästa order"
        subTitle={new Date(currentOrder.endDate).toDateString()}
        style={{ width: '400px' }}
      >
        {currentOrder.items.map((item) => (
          <SimpleList
            ref={measuredRef}
            id={item._id}
            key={item._id}
            title={item.name}
          />
        ))}
        <br />
      </BorderCard>
      <Dialog
        isOpen={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
      />
    </div>
  );
};

import { useCallback, useState } from 'react';
import {
  useGetItemsQuery,
  useGetOrdersQuery,
  GetItemsQuery,
  GetOrdersQuery,
  Item,
  useAddItemToOrderMutation,
  useRemoveItemFromOrderMutation,
} from '../../apollo/generated/client-graphql';
import {
  BorderCard,
  ComplicatedListItem,
  SimpleList,
} from '../../components';
import { Dialog } from '../../components/dialog';
import { aggregateItems } from '../../helpers/aggregateItems';
import { getLatestOrder } from '../../helpers/getLatestOrder';
import { AnimationComponent } from '../favorites/components/AnimationComponent';

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

interface Image {
  position: string[];
  transform: NodeType;
  item: Item;
  destroyMe: (id: number) => void;
  id: number;
}

const OrdersContent = (props: OrdersContentProps) => {
  const [currentOrder] = getLatestOrder(props?.orders.GetOrders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentNodes, setCurrentNodes] = useState<NodeType[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [
    addItemToOrderMutation,
    {
      data: addItemData,
      loading: addItemLoading,
      error: addItemError,
    },
  ] = useAddItemToOrderMutation();
  const [
    removeItemFromOrderMutation,
    {
      data: removeItemData,
      loading: removeItemLoading,
      error: removeItemError,
    },
  ] = useRemoveItemFromOrderMutation();

  console.log('currentNodes', currentNodes);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const x = node.getBoundingClientRect().x;
      const y = node.getBoundingClientRect().y;
      const id = node.id;
      setCurrentNodes((prevNodes) => [...prevNodes, { id, x, y }]);
    }
  }, []);

  const destroyYou = (id: number) => {
    setImages((prev) => prev.filter((el) => el.id !== id));
  };

  const addItem = (id: string, position: string[], item: Item) => {
    const componentId = Math.floor(Math.random() * 1000000);
    const matchingNode = currentNodes.find((n) => n.id === id);

    addItemToOrderMutation({ variables: { id } });

    if (matchingNode) {
      setImages((prev) => {
        return [
          ...prev,
          {
            position,
            transform: matchingNode,
            item,
            destroyMe: destroyYou,
            id: componentId,
          },
        ];
      });
    } else {
    }
  };

  const removeItem = (id: string) => {
    removeItemFromOrderMutation({ variables: { id } });
  };

  const items = aggregateItems(currentOrder.items);

  return (
    <div className={styles.ordersContainer}>
      <BorderCard subTitle="Produkter" style={{ width: '400px' }}>
        {props.items?.GetItems?.map((item) => (
          <ComplicatedListItem
            id={item._id}
            key={item._id}
            item={item}
            setSelectedProduct={addItem}
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
        {items.map((item) => (
          <SimpleList
            ref={measuredRef}
            id={item._id}
            key={item._id}
            title={item.name}
            amount={item.amount}
            name={item.name}
            productImageUrl={item.productImageUrl}
            removeItem={removeItem}
          />
        ))}
        <br />
      </BorderCard>
      <Dialog
        isOpen={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
      />
      {images.map((img) => (
        <AnimationComponent key={img.id} {...img} />
      ))}
    </div>
  );
};

export default Orders;

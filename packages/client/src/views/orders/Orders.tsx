import { BorderCard, ComplicatedListItem } from 'components';
import { useGetItemsQuery } from 'generated/graphql';

import styles from './Orders.module.css';

export const Orders = () => {
  const { data } = useGetItemsQuery();

  return (
    <div className={styles.ordersContainer}>
      <BorderCard subTitle="Produkter" style={{ width: '400px' }}>
        {data?.GetItems?.data?.map((item) => (
          <ComplicatedListItem key={item._id} title={item.name} />
        ))}
      </BorderCard>
      <button> Lägg till ny vara </button>
      <BorderCard
        title="Nästa order"
        subTitle="Levereras 4 oktober"
        style={{ width: '400px' }}
      >
        Beställning
        <br />
        Beställning
        <br />
        Beställning
        <br />
        Beställning
        <br />
        Beställning
        <br />
        Beställning
        <br />
        Beställning
        <br />
        Beställning
        <br />
      </BorderCard>
    </div>
  );
};

import { BorderCard, ComplicatedListItem } from 'components';

import styles from './Orders.module.css';

export const Orders = () => {
  // get the orders

  return (
    <div className={styles.ordersContainer}>
      <BorderCard subTitle="Produkter" style={{ width: '400px' }}>
        <ComplicatedListItem title="Produkt" />
        <ComplicatedListItem title="Produkt" />
        <ComplicatedListItem title="Produkt" />
        <ComplicatedListItem title="Produkt" />
        <ComplicatedListItem title="Produkt" />
        <ComplicatedListItem title="Produkt" newItem />
        <ComplicatedListItem
          title="Produkt"
          throwItInTheTrash={() => {}}
        />
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

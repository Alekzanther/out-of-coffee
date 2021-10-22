import { BorderCard, ComplicatedList } from "components"

import styles from './Orders.module.css'

export const Orders = () => {
    return (
        <div className={styles.ordersContainer}>
            <BorderCard subTitle="Produkter" style={{width: '400px'}}>
                <ComplicatedList title="Produkt" />
                <ComplicatedList title="Produkt" />
                <ComplicatedList title="Produkt" />
                <ComplicatedList title="Produkt" />
                <ComplicatedList title="Produkt" />
                <ComplicatedList title="Produkt" />
                <ComplicatedList title="Produkt" />
                <ComplicatedList title="Produkt" />
            </BorderCard>
            <button> Lägg till ny vara </button>
            <BorderCard title="Nästa order" subTitle="Levereras 4 oktober" style={{width: '400px'}}>
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
    )
}

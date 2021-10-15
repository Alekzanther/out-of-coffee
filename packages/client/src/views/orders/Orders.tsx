import { BorderCard } from "components"

import styles from './Orders.module.css'

export const Orders = () => {
    return (
        <div className={styles.ordersContainer}>
            <BorderCard subTitle="Produkter">
                produkt
                <br />
                produkt
                <br />
                produkt
                <br />
                produkt
                <br />
                produkt
                <br />
                produkt
                <br />
                produkt
                <br />
                produkt
                <br />
            </BorderCard>
            <button> Lägg till ny vara </button>
            <BorderCard title="Nästa order" subTitle="Levereras 4 oktober">
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

import { useMutation, useQuery } from '@apollo/client';
import { Global, ThemeProvider } from '@emotion/react';
import { items } from 'api/data/items';
import { orders } from 'api/data/orders';
import { globalStyles } from 'globalStyles';

import {
  getSchema,
  insertItemMutation,
  insertOrdersMutation,
} from 'queries';
import { theme } from 'theme';
import { Header, Nav } from './components';
function App() {
  // const { data } = useQuery(insertItems, { variables: { items } });
  const [insertItems, { data: itemsData }] = useMutation(
    insertItemMutation,
    {
      variables: { objects: items },
    },
  );

  const [insertOrders, { data: ordersData }] = useMutation(
    insertOrdersMutation,
    {
      variables: { objects: orders },
    },
  );

  console.log(`itemsData`, itemsData);
  console.log(`ordersData`, ordersData);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Header />
      <Nav />
      <button onClick={() => insertItems()}>POPULATE ITEMS </button>
      <button onClick={() => insertOrders()}>POPULATE ORDERS </button>
    </ThemeProvider>
  );
}

export default App;

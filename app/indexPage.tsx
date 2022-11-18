'use client';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo-client/client';
import { ApolloProvider } from '@apollo/client';
import Search from '../components/Search/Search';
import { Order } from '../components/Orders/Orders';
// import Order from './orders/order';

export default function Index() {
  const apolloClient = useApollo({});

  return (
    <div style={{ display: 'flex' }}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Search />
          <Order />
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
}

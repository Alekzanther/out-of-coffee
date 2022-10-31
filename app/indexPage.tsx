'use client';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo-client/client';
import { ApolloProvider } from '@apollo/client';
import { Order } from '../components/Orders2/Orders';
import { Items } from '../components/Items/Items';

// CURRENT ORDER AND A LIST OF ALL AVAILABLE ITEMS

const Index = () => {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex' }}>
          <Items />
          <Order />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Index;

'use client';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo-client/client';
import { ApolloProvider } from '@apollo/client';
import { Layout } from '../components/Layout';
import { Order } from '../components/Orders2/Orders';
import { Items } from '../components/Items/Items';

<link
  href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581441981/Anicons/anicons-regular.css"
  rel="stylesheet"
/>;

// CURRENT ORDER AND A LIST OF ALL AVAILABLE ITEMS

const Index = () => {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Layout>
          <div style={{ display: 'flex' }}>
          WHAT IS UP APP LAYOUT PEOPLEEEEE
            <Items />
            <Order />
          </div>
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Index;

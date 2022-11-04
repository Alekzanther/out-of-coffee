'use client';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo-client/client';
import { ApolloProvider } from '@apollo/client';
import Search from '../components/Search/Search';

export default function Index() {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex' }}>
          <Search />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

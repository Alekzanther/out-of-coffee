// import styled from 'styled-components'
import './index.css';

import { theme } from '../theme';
// import { Header } from '../components';
import React, { MouseEventHandler, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo-client/client';
import { ApolloProvider } from '@apollo/client';
import { Layout } from '../components/Layout';

// const Main = styled.div``;

// const SnackBar = styled.div`
//   background-color: #fdffa3;
//   text-align: center;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

function App({ Component, pageProps }) {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Layout>
          <div className="app">
            <Component {...pageProps} />
          </div>
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

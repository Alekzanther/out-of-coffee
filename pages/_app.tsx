import { GlobalStyles } from '../globalStyles';
// import styled from 'styled-components'
import './index.css';

import { theme } from '../theme';
// import { Header } from '../components';
import React, { MouseEventHandler, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo-client/client';
import { ApolloProvider } from '@apollo/client';
import Link from 'next/link';

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
        <div className="app">
          <GlobalStyles />
          <div>
            <p>Beställ innan torsdag 25 september kl 12:00! 🎉</p>
          </div>
          <div>
            <Link href="/products">Items</Link>
            <Link href="/favorites">Favorites</Link>
            <Link href="/">Hem</Link>
          </div>
          <h1>Müsl.io</h1>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

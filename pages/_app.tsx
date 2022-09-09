import { GlobalStyles } from '../globalStyles';
// import styled from 'styled-components'
import './index.css';

import { theme } from '../theme';
import { Header, Nav } from '../components';
import React, { MouseEventHandler, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo/client';
import { ApolloProvider } from '@apollo/client';

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
  const [cursor, setCursor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const onMouseMove = (event: any): void => {
    setCursor({ x: event.screenX, y: event.screenY });
  };

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <GlobalStyles />
          <div>
            <p>Beställ innan torsdag 25 september kl 12:00! 🎉</p>
          </div>
          <div>
            <a href="/orders">orders</a>
            <a href="/favorites">favorites</a>
            <a href="/">hem</a>
          </div>
          <Header>Müsl.io</Header>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

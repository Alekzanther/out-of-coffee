import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from './globalStyles';
import styled from '@emotion/styled';

import { theme } from './theme';
import { Header, Nav } from './components';
import React, { MouseEventHandler, useState } from 'react';

const Main = styled.div``;

const SnackBar = styled.div`
  background-color: #fdffa3;
  text-align: center;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [cursor, setCursor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const onMouseMove = (event: any): void => {
    setCursor({ x: event.screenX, y: event.screenY });
  };

  // console.log('cursor', cursor);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Global styles={globalStyles} />
        <SnackBar>
          <p>Beställ innan torsdag 25 september kl 12:00! 🎉</p>
        </SnackBar>
        <Header>Müsl.io</Header>
        <Nav />
      </Main>
    </ThemeProvider>
  );
}

export default App;

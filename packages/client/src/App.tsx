import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from './globalStyles';
import styled from '@emotion/styled';

import { theme } from './theme';
import { Header, Nav } from './components';

const Main = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  grid-template-areas:
    'snack snack snack'
    'header header header'
    'content content content';
  grid-auto-rows: auto auto 1fr;
  grid-auto-columns: 1fr;
  justify-content: center;
`;

const SnackBar = styled.div`
  background-color: #fdffa3;
  grid-area: snack;
  text-align: center;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
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

import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from './globalStyles';
import styled from '@emotion/styled';

import { theme } from './theme';
import { Header, Nav } from './components';

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

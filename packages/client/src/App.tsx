import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from 'globalStyles';

import { theme } from 'theme';
import { Header, Nav } from './components';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Header />
      <Nav />
    </ThemeProvider>
  );
}

export default App;

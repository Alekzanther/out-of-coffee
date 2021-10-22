import { useQuery } from '@apollo/client';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from 'globalStyles';

import { getSchema } from 'queries';
import { theme } from 'theme';
import { Header, Nav } from './components';
function App() {
  const { data } = useQuery(getSchema);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Header />
      <Nav />
    </ThemeProvider>
  );
}

export default App;

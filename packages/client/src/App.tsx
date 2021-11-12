import { Global, ThemeProvider } from '@emotion/react';
import { useGetItemsQuery } from 'generated/graphql';
import { globalStyles } from 'globalStyles';

import { theme } from 'theme';
import { Header, Nav } from './components';

function App() {
  const { data: items } = useGetItemsQuery();
  console.log(`data`, items);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Header />
      <Nav />
    </ThemeProvider>
  );
}

export default App;

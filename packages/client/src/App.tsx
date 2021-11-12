import { Global, ThemeProvider } from '@emotion/react';
import { useGetSchemaQuery } from 'generated/graphql';
import { globalStyles } from 'globalStyles';

import { theme } from 'theme';
import { Header, Nav } from './components';

function App() {
  const { data, error } = useGetSchemaQuery();
  console.log(`data`, data);
  console.log(`error`, error);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Header />
      <Nav />
    </ThemeProvider>
  );
}

export default App;

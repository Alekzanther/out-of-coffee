import { useQuery } from '@apollo/client';
import { Global, css, ThemeProvider } from '@emotion/react';

import { getSchema } from 'queries';
import { Header, Nav } from './components';
function App() {
  const { data } = useQuery(getSchema);
  const theme = {
    colors: {
      greenLantern: 'rgba(25, 122, 23, 0.54)',
      pitchBlack: '#000000',
    },
  };

  const globalStyles = css`
    p {
      weight: 400;
      font-size: 14px;
    }
  `;
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />

        <Header />
        <Nav />
      </ThemeProvider>
    </>
  );
}

export default App;

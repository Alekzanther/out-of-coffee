import { useQuery } from '@apollo/client';

import { getSchema } from 'queries';
import { Header } from './components';
import { Nav } from './components';
function App() {
  const { data } = useQuery(getSchema);

  return (
    <>
      <Header />
      <Nav />
    </>
  );
}

export default App;

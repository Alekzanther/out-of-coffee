import { gql, useQuery } from '@apollo/client';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Header } from './components';

import { Orders } from './views';

const query = gql`
  query GetSchema {
    __schema {
      __typename
    }
  }
`;

function App() {
  const { data } = useQuery(query);

  return (
    <>
      <Header />
      <Tabs>
        <TabList>
          {/* Just nu jobbar Victor här */}
          <Tab>Beställning</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Orders />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default App;

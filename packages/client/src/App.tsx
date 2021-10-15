import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Header } from './components';

import { Orders } from './views';

function App() {
  return (
    <>
      <Header />
      <Tabs>
        <TabList>
          <Tab>Beställning</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
          {/* Just nu jobbar Victor här */}
          <Tab>Border box dev area</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Beställningar!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <Orders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default App;

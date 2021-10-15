import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Orders } from '../../views';

export const Nav = () => {
  console.log('hejsan');

  return (
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
  );
};

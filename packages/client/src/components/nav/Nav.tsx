import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Orders, Favorites } from '../../views';

export const Nav = () => {
  console.log('hejsan');

  return (
    <Tabs>
      <TabList>
        <Tab>Beställning</Tab>
        <Tab>Favorites</Tab>
        <Tab>Three</Tab>
        {/* Just nu jobbar Victor här */}
        <Tab>Border box dev area</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Beställningar!</p>
        </TabPanel>
        <TabPanel>
          <Favorites />
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

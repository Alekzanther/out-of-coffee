/** @jsxImportSource @emotion/react */

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Orders, Favorites } from '../../views';
import styled from '@emotion/styled';

const StyledTabList = styled(TabList)`
  max-width: 888px;
  padding: 0 60px;
  margin: 0 auto;
  background: none;
  justify-content: space-between;
  > [data-reach-tab][data-selected] {
    border-bottom-color: hotpink;
    border-bottom-width: 4px;
    &:focus {
      outline-color: hotpink;
    }
  }
`;

const StyledTab = styled(Tab)`
  border-bottom-width: 4px;
`;

export const Nav = () => {
  console.log('hejsan');

  return (
    <Tabs>
      <StyledTabList>
        <StyledTab>Beställning</StyledTab>
        <StyledTab>Favorites</StyledTab>

        {/* Just nu jobbar Victor här */}
        <StyledTab>Border box dev area</StyledTab>
      </StyledTabList>

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

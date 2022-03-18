/** @jsxImportSource @emotion/react */

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Orders, Favorites } from '../../views';
import styled from '@emotion/styled';

const StyledTabList = styled(TabList)`
  justify-content: space-evenly;
  width: 100%;
  background: none;
`;

const StyledTab = styled(Tab)`
  border-bottom-width: 4px;
`;

export const Nav = () => {
  return (
    <Tabs>
      <StyledTabList>
        <StyledTab>Beställning</StyledTab>
        <StyledTab>Basorder & Favoriter</StyledTab>
      </StyledTabList>
      <TabPanels>
        <TabPanel>
          <Orders />
        </TabPanel>
        <TabPanel>
          <Favorites />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

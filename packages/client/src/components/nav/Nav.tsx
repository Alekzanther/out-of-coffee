/** @jsxImportSource @emotion/react */

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Orders, Favorites } from '../../views';
import styled from '@emotion/styled';
import { useGetOrdersQuery } from 'generated/graphql';

const StyledTabList = styled(TabList)`
  justify-content: space-evenly;
  width: 100%;
  background: none;
  grid-area: nav;
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

const StyledTabs = styled(Tabs)`
  grid-area: content;
  display: grid;
  grid-template-areas:
    'nav nav nav'
    'a b c';
  grid-auto-rows: auto 1fr;
  grid-auto-columns: 1fr;
`;
const StyledTabPanels = styled(TabPanels)`
  display: contents;
`;

export const Nav = () => {
  // const { data: items } = useGetItemsQuery();
  const { data: orders } = useGetOrdersQuery();
  console.log(`orders`, orders);
  return (
    <StyledTabs>
      <StyledTabList>
        <StyledTab>Beställning</StyledTab>
        <StyledTab>Favorites</StyledTab>
      </StyledTabList>

      <StyledTabPanels>
        <TabPanel>
          <Orders />
        </TabPanel>
        <TabPanel>
          <Favorites />
        </TabPanel>
      </StyledTabPanels>
    </StyledTabs>
  );
};

/** @jsxImportSource @emotion/react */

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Orders, Favorites } from '../../views';
import styled from '@emotion/styled';
import { useGetOrdersQuery } from 'generated/graphql';

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
  // const { data: items } = useGetItemsQuery();
  const { data: orders } = useGetOrdersQuery();
  console.log(`orders`, orders);
  return (
    <Tabs>
      <StyledTabList>
        <StyledTab>Beställning</StyledTab>
        <StyledTab>Favorites</StyledTab>
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

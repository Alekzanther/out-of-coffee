/** @jsxImportSource @emotion/react */

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Orders, Favorites } from '../../views';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

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
    'nav nav'
    'a a';
  grid-auto-rows: auto 1fr;
  grid-auto-columns: 1fr;
`;
const StyledTabPanels = styled(TabPanels)`
  display: contents;
`;

const gridAreaA = css`
  grid-area: a;
`;

export const Nav = () => {
  return (
    <StyledTabs>
      <StyledTabList>
        <StyledTab>Beställning</StyledTab>
        <StyledTab>Basorder & Favoriter</StyledTab>
      </StyledTabList>

      <StyledTabPanels>
        <TabPanel css={gridAreaA}>
          <Orders />
        </TabPanel>
        <TabPanel css={gridAreaA}>
          <Favorites />
        </TabPanel>
      </StyledTabPanels>
    </StyledTabs>
  );
};

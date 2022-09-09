import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5 {
    padding: 0;
    margin: 0;
  }

  h2 {
    font-size: 36px;
    font-weight: 400;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    margin: 0;
  }
`;

import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';

import '@reach/tabs/styles.css';

import { client } from './api';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);

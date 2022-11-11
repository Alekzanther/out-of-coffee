import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../apollo-client/client';
import { ApolloProvider } from '@apollo/client';
import Search from '../components/Search/Search';
import { Suspense } from 'react';
import Loading from './orders/loading';
import Order from './orders/order';

export default function Index() {
  // const apolloClient = useApollo({});

  // return (
  //   <div style={{ display: 'flex' }}>
  //     <ApolloProvider client={apolloClient}>
  //       <ThemeProvider theme={theme}>
  //         <Search />
  //         <Suspense fallback={<Loading />}>
  //           <Order />
  //         </Suspense>
  //       </ThemeProvider>
  //     </ApolloProvider>
  //   </div>
  // );

  return (
    <div>
      Index stuff
      <Suspense fallback={'Loading...'}>
        {/* @ts-expect-error Server Component */}
        <Order />
      </Suspense>
    </div>
  );
}

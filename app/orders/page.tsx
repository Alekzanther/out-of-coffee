import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../../apollo-client/client';
import Order from './order';
import { theme } from '../../theme';
import { Suspense } from 'react';
import Thing from './thing';
import Loading from './loading';

// async function getData(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('done!');
//     }, 5000);
//   });
// }

export default async function Page() {
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  // const data = await getData();
  return (
    <div>
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error Server Component */}
        <Order />
      </Suspense>
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error Server Component */}
        <Thing />
      </Suspense>
    </div>
  );
}

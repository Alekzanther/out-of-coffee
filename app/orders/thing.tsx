import { Suspense } from 'react';
import { Order as OrderCompomnent } from '../../components/Orders/Orders';
import Loading from './loading';

async function getData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('More cool data!');
    }, 5000);
  });
}

export default async function Thing() {
  // return <OrderCompomnent />;
  const data = await getData();
  return (
    <div>
      <div>{data}</div>
    </div>
  );
}

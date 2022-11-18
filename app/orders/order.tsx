import { Suspense } from 'react';
import { Order as OrderCompomnent } from '../../components/Orders/Orders';
import Loading from './loading';

async function getData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('orderData!');
    }, 3000);
  });
}

export default async function Order() {
  // return <OrderCompomnent />;
  const data = await getData();
  return (
    <div>
      <div>{data}</div>
    </div>
  );
}

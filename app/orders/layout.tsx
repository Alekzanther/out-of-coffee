import { Suspense } from 'react';
import Loading from './loading';

export default async function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

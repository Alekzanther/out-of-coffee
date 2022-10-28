import Head from 'next/head';
import Link from 'next/link';

export type LayoutProps = {
  pageTitle?: string;
  children: JSX.Element;
};
import { GlobalStyles } from '../globalStyles';
export const Layout = (props: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {`Antura matbeställning ${
            props.pageTitle ? '| ' + props.pageTitle : ''
          }`}
        </title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <GlobalStyles />
      <div>
        <p>Beställ innan torsdag 25 september kl 12:00! 🎉</p>
      </div>
      <div>
        <Link href="/">hem</Link>
        <Link href="/products">products</Link>
        <Link href="/favorites">favorites</Link>
        <Link href="/stuff">stuff</Link>
      </div>
      <h1>Müsl.io</h1>
      <div>{props.children}</div>
    </>
  );
};

import Head from 'next/head';
import Link from 'next/link';
import './global.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Mysliy0</title>
        <link
          href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581441981/Anicons/anicons-regular.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div>
          <p>Beställ innan torsdag 25 september kl 12:00! 🎉</p>
        </div>
        <div>
          <Link href="/">hem</Link>
          <Link href="/history">history</Link>
        </div>
        <h1>Müsl.io</h1>
        {/* 
        Add apollo wrapper here if every child should use it,
        but if you do you have to set every component to a client component
        and that will break any suspense and server streaming and make everything
        client rendered
      */}
        <>{children}</>
      </body>
    </html>
  );
}

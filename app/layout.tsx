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
      <head>
        <title>Mysliy0</title>
      </head>
      <body>
        <div className="app">
          {children}
        </div>
      </body>
    </html>
  );
}


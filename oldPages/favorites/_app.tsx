function App({ Component, pageProps }) {
  return (
    <div className="app">
      <div>
        <p>Beställ innan torsdag 25 september kl 12:00! 🎉</p>
      </div>
      <div>
        <a href="/orders">orders</a>
        <a href="/favorites">favorites</a>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default App;

import styles from './Header.module.css';

const SnackBar = () => {
  return (
    <div className={styles.snackContainer}>
      <p> Beställ innan torsdag 25 september kl 12:00! 🎉 </p>
    </div>
  );
};

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <SnackBar />
      <h1 className={styles.headerTitle}>Müsl.io</h1>
    </div>
  );
};

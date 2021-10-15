import styles from './BorderCard.module.css';

interface Props {
  title?: string;
  subTitle: string;
}

export const BorderCard: React.FC<Props> = ({title, subTitle, children}) => {
  const padding = title ? '48px' : '16px'

  return (
    <div className={styles.borderCard} style={{padding}}>
      <div className={styles.cardTitlesContainer}>
        <div className={styles.cardTitles}>
            {/* TODO: Add typography component */}
            <h1>{title}</h1>
            <h3>{subTitle}</h3>
        </div>
      </div>
      <div className={styles.rightSideWhite}/>
      <div className={styles.leftSideWhite}/>
      <div className={styles.bottomSideWhite}/>
      <div>
        {children}
      </div>
    </div>
  )
}

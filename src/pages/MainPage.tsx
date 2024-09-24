import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <div className={styles.titleContainer}>
          <h1>VALOFE ADMIN TOOL</h1> 
          <h5>Control panel</h5>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

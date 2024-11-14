import styles from './UserDisplay.module.css';

function UserDisplay() {
  const date = new Date();

  return (
    <div className={styles['user-display']}>
      <h2 className={styles.message}>Good Morning!!👋</h2>
      <time>{date.toDateString()}</time>
    </div>
  );
}

export default UserDisplay;

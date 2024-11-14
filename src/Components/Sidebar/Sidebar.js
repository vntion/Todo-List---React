import AppNav from '../AppNav/AppNav';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.heading}>Tasks</h1>
      <AppNav />
    </div>
  );
}

export default Sidebar;

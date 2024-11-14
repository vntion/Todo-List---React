import Sidebar from '../../Components/Sidebar/Sidebar';
import Main from '../../Components/Main/Main';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles['app-layout']}>
      <Sidebar />
      <Main />
    </div>
  );
}

export default AppLayout;

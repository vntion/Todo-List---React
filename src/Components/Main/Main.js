import { Outlet } from 'react-router';
import GroupLists from '../GroupLists/GroupLists';
import UserDisplay from '../UserDisplay/UserDisplay';

import styles from './Main.module.css';
import CreateNewTask from '../CreateNewTask/CreateNewTask';

function Main() {
  return (
    <main className={styles['main']}>
      <UserDisplay />
      <GroupLists />
      <Outlet />
      <CreateNewTask />
    </main>
  );
}

export default Main;

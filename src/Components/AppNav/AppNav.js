import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';
import { useTodoList } from '../../Context/TodoListContext';

function AppNav() {
  const {
    totalTasks,
    completedTasksLength,
    personalTasksLength,
    workTasksLength,
    wishListTasksLength,
  } = useTodoList();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'home'}>
            <span className={styles.emoji}>🏠</span>Home{' '}
            <span className={styles.num}>{totalTasks}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'completed'}>
            <span className={styles.emoji}>✔️</span>Completed{' '}
            <span className={styles.num}>{completedTasksLength}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'personal'}>
            <span className={styles.emoji}>💖</span>Personal{' '}
            <span className={styles.num}>{personalTasksLength}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'work'}>
            <span className={styles.emoji}>💼</span>Work{' '}
            <span className={styles.num}>{workTasksLength}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'wishlist'}>
            <span className={styles.emoji}>📝</span>Wishlist{' '}
            <span className={styles.num}>{wishListTasksLength}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;

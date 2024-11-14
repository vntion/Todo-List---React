import { useState } from 'react';

import styles from './GroupLists.module.css';
import { useTodoList } from '../../Context/TodoListContext';

const groupOptions = ['All', 'Today', 'Tomorrow', 'Previous'];

function GroupLists() {
  const { dispatch } = useTodoList();

  const [option, setOption] = useState('All');

  function handleChange(e) {
    setOption(e.target.value);

    dispatch({ type: 'task/changeGroup', payload: e.target.value });
  }

  return (
    <div className={styles.group}>
      <select value={option} onChange={handleChange}>
        {groupOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GroupLists;

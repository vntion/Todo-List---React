import FormNewTask from '../FormNewTask/FormNewTask';
import styles from './CreateNewTask.module.css';

import { useState } from 'react';

function CreateNewTask() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles['create-task']}>
      {isOpen && (
        <>
          <FormNewTask onOpen={setIsOpen} />
          <div
            className={styles.overlay}
            onClick={() => {
              setIsOpen(false);
            }}
          ></div>
        </>
      )}

      <button
        onClick={() => setIsOpen(open => !open)}
        className={styles['button-new-task']}
      >
        <span>+ Create new task</span>
        <span>📝</span>
      </button>
    </div>
  );
}

export default CreateNewTask;

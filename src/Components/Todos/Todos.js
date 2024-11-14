import { useState } from 'react';
import { useTodoList } from '../../Context/TodoListContext';
import Message from '../Message/Message';
import styles from './Todos.module.css';

function Todos({ category = 'All' }) {
  const {
    tasks,
    completedTasks,
    personalTasks,
    workTasks,
    wishListTasks,
    dispatch,
  } = useTodoList();

  const [curOpen, setCurOpen] = useState(null);

  function handleDeleteAll() {
    const confirmed = window.confirm('Are you want to delete all tasks?');

    if (confirmed) dispatch({ type: 'task/deleteAll' });
  }

  let tasksItem;

  if (category === 'All') tasksItem = tasks;
  if (category === 'Completed') tasksItem = completedTasks;
  if (category === 'Personal') tasksItem = personalTasks;
  if (category === 'Work') tasksItem = workTasks;
  if (category === 'Wishlist') tasksItem = wishListTasks;

  return (
    <div>
      {tasksItem.length === 0 ? (
        <Message message="There are no tasks in this category" />
      ) : (
        <>
          <ul className={styles['todos-list']}>
            {tasksItem.map(taks => (
              <Todo
                taks={taks}
                key={taks.id}
                dispatch={dispatch}
                onOpen={setCurOpen}
                curOpen={curOpen}
              />
            ))}
          </ul>

          <button className={styles['btn-deleteAll']} onClick={handleDeleteAll}>
            Delete all
          </button>
        </>
      )}
    </div>
  );
}

function Todo({ taks, dispatch, curOpen, onOpen }) {
  const [isEdit, setIsEdit] = useState(false);

  const isOpen = taks.id === curOpen;

  function handleTaskDone() {
    dispatch({ type: 'task/toggleStatus', payload: taks.id });
  }

  function handleDeleteTask() {
    dispatch({ type: 'task/delete', payload: taks.id });
  }

  function handleEditTask() {}

  return (
    <li className={styles['todos-item']}>
      <input
        type="checkbox"
        onChange={handleTaskDone}
        checked={taks.status === 'completed'}
      />
      <span className={styles.todo}>{taks.todo}</span>
      <span className={styles.date}>
        📅 {String(taks.date.getMonth() + 1).padStart(2, 0)} -{' '}
        {String(taks.date.getDate()).padStart(2, 0)}
      </span>
      <button
        onClick={() => onOpen(open => (open === taks.id ? null : taks.id))}
      >
        &#8285;
      </button>

      {isOpen && (
        <div className={styles['option-delete']}>
          <ul>
            <li onClick={handleEditTask}>Edit</li>
            <li onClick={handleDeleteTask}>Delete</li>
          </ul>
        </div>
      )}
    </li>
  );
}

export default Todos;

import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './FormNewTask.module.css';
import { useState } from 'react';
import { useTodoList } from '../../Context/TodoListContext';

// function CustomCalenderContainer({ className, children }) {
//   return (
//     <CalendarContainer className={styles['calender-container']}>
//       <div style={{ position: 'relative' }}>{children}</div>
//     </CalendarContainer>
//   );
// }

const categoryOptions = ['No category', 'Personal', 'Work', 'Wishlist'];

function FormNewTask({ onOpen }) {
  const { dispatch } = useTodoList();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('No category');

  function handleSubmit() {
    if (!task || !selectedDate) return;

    const uuid = uuidv4();
    const uuidPart = uuid.split('-')[0];
    const uuidNumber = parseInt(uuidPart, 16);

    const newTask = {
      todo: task,
      category,
      date: selectedDate,
      status: 'uncomplete',
      id: uuidNumber,
    };

    dispatch({ type: 'task/add', payload: newTask });
    onOpen(false);
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Masukkan tugas baru di sini"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categoryOptions.map((category, i) => (
          <option value={category} key={i}>
            {category}
          </option>
        ))}
      </select>

      <DatePicker
        inline
        selected={selectedDate}
        onChange={d => setSelectedDate(d)}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.header}>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={styles.navigationButton}
            >
              {'<'}
            </button>
            <span className={styles.monthYear}>
              <span>📅</span>{' '}
              {date.toLocaleString('default', { month: 'long' })},
              {date.getFullYear()}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={styles.navigationButton}
            >
              {'>'}
            </button>
          </div>
        )}
        dayClassName={date => {
          const today = new Date();
          return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
            ? styles.today
            : selectedDate && date.getTime() === selectedDate.getTime()
            ? styles.selectedDay
            : styles.day;
        }}
      />

      <button className={styles['btn-submit']} onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
}

export default FormNewTask;

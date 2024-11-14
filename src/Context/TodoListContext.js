import { createContext, useContext, useReducer } from 'react';

const TodoListContext = createContext();

const initialState = {
  tasks: [],
  groupBy: 'All',
};

function reducer(state, action) {
  switch (action.type) {
    case 'task/add':
      return { ...state, tasks: [...state.tasks, action.payload] };

    case 'task/toggleStatus':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                status:
                  task.status === 'completed' ? 'uncompleted' : 'completed',
              }
            : task
        ),
      };

    case 'task/delete':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'task/deleteAll':
      return { ...state, tasks: [] };

    case 'task/changeGroup':
      return { ...state, groupBy: action.payload };

    default:
      throw new Error("This action doesn't exists!");
  }
}

function TodoListProvider({ children }) {
  const [{ tasks, groupBy }, dispatch] = useReducer(reducer, initialState);

  const now = new Date();
  const dayNow = now.getDate();
  const monthNow = now.getMonth();
  const yearNow = now.getFullYear();

  let task = tasks;

  if (groupBy === 'Today') {
    task = task.filter(
      task =>
        task.date.getDate() === dayNow &&
        task.date.getMonth() === monthNow &&
        task.date.getFullYear() === yearNow
    );
  }

  if (groupBy === 'Tomorrow') {
    task = task.filter(task => task.date > now);
  }

  if (groupBy === 'Previous') {
    task = task.filter(
      task =>
        task.date < now &&
        !(
          task.date.getDate() === dayNow &&
          task.date.getMonth() === monthNow &&
          task.date.getFullYear() === yearNow
        )
    );
  }

  // Tasks
  const allTasks = task.filter(task => task.status !== 'completed');
  const completedTasks = task.filter(task => task.status === 'completed');
  const personalTasks = task.filter(
    task => task.category === 'Personal' && task.status !== 'completed'
  );
  const workTasks = task.filter(
    task => task.category === 'Work' && task.status !== 'completed'
  );
  const wishListTasks = task.filter(
    task => task.category === 'Wishlist' && task.status !== 'completed'
  );

  // Tasks Length
  const totalTasks = tasks.filter(task => task.status !== 'completed').length;
  const completedTasksLength = tasks.filter(
    task => task.status === 'completed'
  ).length;
  const personalTasksLength = tasks.filter(
    task => task.category === 'Personal' && task.status !== 'completed'
  ).length;
  const workTasksLength = tasks.filter(
    task => task.category === 'Work' && task.status !== 'completed'
  ).length;
  const wishListTasksLength = tasks.filter(
    task => task.category === 'Wishlist' && task.status !== 'completed'
  ).length;

  const value = {
    tasks: allTasks,
    totalTasks,
    completedTasksLength,
    personalTasksLength,
    workTasksLength,
    wishListTasksLength,
    completedTasks,
    personalTasks,
    workTasks,
    wishListTasks,
    dispatch,
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
}

function useTodoList() {
  const context = useContext(TodoListContext);
  if (context === undefined)
    throw new Error('TodoListContext was used outside the TodoListProvider');

  return context;
}

export { TodoListProvider, useTodoList };

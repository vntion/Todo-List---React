import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './Pages/AppLayout/AppLayout';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import { TodoListProvider } from './Context/TodoListContext';
import Todos from './Components/Todos/Todos';

function App() {
  return (
    <TodoListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Todos />} />
            <Route path="completed" element={<Todos category="Completed" />} />
            <Route path="personal" element={<Todos category="Personal" />} />
            <Route path="work" element={<Todos category="Work" />} />
            <Route path="wishlist" element={<Todos category="Wishlist" />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </TodoListProvider>
  );
}

export default App;

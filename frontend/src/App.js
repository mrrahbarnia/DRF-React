import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';
import BookPage, { loader as bookLoader } from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import BookDetailPage, { loader as BookDetailLoader } from './pages/BookDetailPage';
import AddBook, { action as AddBookAction } from './pages/AddBook';

const router = createBrowserRouter([
  {path: '/', element: <RootPage />, errorElement: <ErrorPage />, children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />},
      {path: 'book', element: <BookPage />, loader: bookLoader},
      {path: 'book/:bookSlug', element: <BookDetailPage />, loader: BookDetailLoader},
      {path: 'add-book/', element: <AddBook />, action: AddBookAction}
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;

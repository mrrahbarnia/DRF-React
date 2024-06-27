import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';
import BookPage, { loader as bookLoader } from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import BookDetail from './pages/BookDetail';

const router = createBrowserRouter([
  {path: '/', element: <RootPage />, errorElement: <ErrorPage />, children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />},
      {path: 'book', element: <BookPage />, loader: bookLoader},
      {path: 'book/:bookSlug', element: <BookDetail />}
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;

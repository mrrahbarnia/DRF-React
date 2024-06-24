import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import RootPage from './pages/RootPage';

const router = createBrowserRouter([
  {path: '/', element: <RootPage />, errorElement: <ErrorPage />}
])

function App() {
  return <RouterProvider router={router} />
}

export default App;

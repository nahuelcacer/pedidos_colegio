import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Navigate, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';



const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('authTokens');
  const isAuthenticated = token ? true : false;

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  return children
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'home/',
        element: <App></App>
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
    {/* <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App/>}></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
        </Routes>
      </AuthProvider>
    </Router> */}
  </React.StrictMode>
);

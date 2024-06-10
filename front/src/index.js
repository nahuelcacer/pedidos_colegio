import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Navigate, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Root from './pages/main/Root';
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
    path: "login/",
    element: <LoginPage></LoginPage>,
    errorElement: <ErrorPage></ErrorPage>
  },
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
      <AuthProvider>
      </AuthProvider>
    </RouterProvider>
  </React.StrictMode>
);

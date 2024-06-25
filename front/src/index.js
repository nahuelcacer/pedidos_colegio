import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Navigate, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Root from './pages/main/Root';
import ErrorPage from './pages/ErrorPage';
import MainPedidos from './pages/pedidos/MainPedidos';
import AgregarClientes from './pages/clientes/AgregarClientes';
import MainClientes from './pages/clientes/MainClientes';


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
        path: 'pedidos/',
        element: <MainPedidos></MainPedidos>
      },
      {
        path: 'clientes/',
        element: <MainClientes></MainClientes>
      },
      {
        path: 'clientes/agregar/',
        element: <AgregarClientes></AgregarClientes>,
      },
      {
        path: 'pedidos/',
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

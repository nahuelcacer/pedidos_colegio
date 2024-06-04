import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';



const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('authTokens');
  const isAuthenticated = token ? true : false;

  if (!isAuthenticated) {
    return <Navigate to='/login' />

  }
  return children
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<RequireAuth><App/></RequireAuth>}></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

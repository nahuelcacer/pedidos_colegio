import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Root.css'
import Sidebar from '../../component/sidebar/Sidebar';
import { theme } from '../../theme';
import { ThemeProvider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Root = () => {
  const token = localStorage.getItem('authTokens');
  const isAuthenticated = token ? true : false;


  if (isAuthenticated) {


    return (
      <ThemeProvider theme={theme}>
        <ToastContainer></ToastContainer>
        <div class="container_main">
          <Sidebar></Sidebar>
          <div id="header">
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    );
  } else {
    return <Navigate to='/login' />
  }
};

export default Root;

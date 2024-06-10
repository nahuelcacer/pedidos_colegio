import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Root.css'
import Sidebar from '../../component/sidebar/Sidebar';


const Root = () => {
  const token = localStorage.getItem('authTokens');
  const isAuthenticated = token ? true : false;

  let navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('authTokens')
    navigate('login/')
  }
  // const { logoutUser } = useContext(AuthContext)
  if (isAuthenticated) {


    return (
      <div class="container_main">
        <Sidebar></Sidebar>
        <div id="main">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate to='/login' />
  }
};

export default Root;

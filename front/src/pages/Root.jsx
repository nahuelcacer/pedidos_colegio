import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../pages/Root.css'
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
        <div id="sidebar">
          <h1>Usuario</h1>
          <input placeholder='Search...' />
          <nav>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>
                <a >Your Name</a>
              </li>
              <li>
                <a >Your Friend</a>
              </li>
              <li>
                <a onClick={logout} >Logout</a>
              </li>
            </ul>
          </nav>
        </div>
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

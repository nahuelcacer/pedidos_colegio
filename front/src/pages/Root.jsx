import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

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
      <div style={{ display: 'flex', height: '100vh' }}>
        <div id="sidebar" style={{ width: '150px', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: '#e3e6f4', padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
          <h1>Navegar</h1>
          <input placeholder='Search...' style={{ width: '100%', padding: '5px', marginBottom: '20px', boxSizing: 'border-box' }} />
          <nav>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ margin: '10px 0' }}>
                <a href={`/contacts/1`} style={{ textDecoration: 'none', color: '#007bff' }}>Your Name</a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href={`/contacts/2`} style={{ textDecoration: 'none', color: '#007bff' }}>Your Friend</a>
              </li>
              <li>
                <a onClick={logout} style={{textDecoration:'none', color:'#007bff'}}>Logout</a>
              </li>
            </ul>
          </nav>
        </div>
        <div style={{ marginLeft: '200px', padding: '20px', flexGrow: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate to='/login' />
  }
};

export default Root;

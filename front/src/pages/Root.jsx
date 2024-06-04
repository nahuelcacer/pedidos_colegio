import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div id="sidebar" style={{ width: '200px', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: '#f8f9fa', padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
        <h1>Navegar</h1>
        <input placeholder='Search...' style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }} />
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ margin: '10px 0' }}>
              <a href={`/contacts/1`} style={{ textDecoration: 'none', color: '#007bff' }}>Your Name</a>
            </li>
            <li style={{ margin: '10px 0' }}>
              <a href={`/contacts/2`} style={{ textDecoration: 'none', color: '#007bff' }}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ marginLeft: '200px', padding: '20px', flexGrow: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

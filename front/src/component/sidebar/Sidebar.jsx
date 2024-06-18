import React, { useState } from "react";
import "./Sidebar.css";
import Usuario from "../user/Usuario";
import { Link } from "react-router-dom";

const Url = ({ url, isSelected, onClick }) => {
  return (
    <Link to={url.url}>
      <li className={`list-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <span dangerouslySetInnerHTML={{ __html: url.icon }}></span>
        {url.nombre}
      </li>
    </Link>
  );
};

const ListaUrls = ({ urls }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  if (urls != null) {
    return (
      <ul>
        {urls.map((item, index) => (
          <Url
            key={index}
            url={item}
            isSelected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </ul>
    );
  }
  return null;
};


const Sidebar = () => {
  const [user, setUser] = useState(
    () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  )
  const [urls, setUrls] = useState(
    () => localStorage.getItem('urls') ? JSON.parse(localStorage.getItem('urls')) : null
  )
  console.log(user)
  return (
    <nav className="root_nav" id="sidebar">
      <Usuario {...user}></Usuario>

      <div>
        <ListaUrls urls={urls}></ListaUrls>
      </div>
    </nav>
  );
};

export default Sidebar;

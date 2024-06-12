import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Usuario from "../user/Usuario";
import { getUser } from "../../service/user";
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

const ListaUrls = ({ user }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (user != null) {
    return (
      <ul>
        {user.urls.urls.map((item, index) => (
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
  const [user, setUser] = useState(null)

  const fetchData = async () => { // Define una función asincrónica
    const user = await getUser(); // Usa await dentro de la función asincrónica
    setUser(user) // Haz lo que necesites con el usuario
    console.log(user)
  };


  useEffect(() => {
    fetchData()

  }, [])
  return (
    <nav className="root_nav" id="sidebar">
      <Usuario {...user}></Usuario>

      <div>
        <ListaUrls user={user}></ListaUrls>
      </div>
    </nav>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Usuario from "../user/Usuario";
import { getUser } from "../../service/user";
import { Link } from "react-router-dom";


const ListaUrls = () => {
  return (
     <li>s</li>
  )
}
const Sidebar = () => {
  const [user, setUser] = useState([])

  const fetchData = async () => { // Define una función asincrónica
    const user = await getUser(); // Usa await dentro de la función asincrónica
    setUser(user) // Haz lo que necesites con el usuario
  };

  
  useEffect(()=>{
    fetchData()
    
  },[])
  return (
    <nav className="root_nav" id="sidebar">
      <Usuario {...user}></Usuario>

      <div>
        <ul>
          <ListaUrls></ListaUrls>
          <li><Link to={'/home'}>CL</Link></li>
          <li>ss</li>
          <li>ss3</li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

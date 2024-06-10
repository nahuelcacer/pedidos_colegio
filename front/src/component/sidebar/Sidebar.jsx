import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Usuario from "../user/Usuario";
import { getUser } from "../../service/user";



const Sidebar = () => {

  const fetchData = async () => { // Define una función asincrónica
    const user = await getUser(); // Usa await dentro de la función asincrónica
    setUser(user) // Haz lo que necesites con el usuario
  };

  
  const [user, setUser] = useState(null)
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <nav className="root_nav" id="sidebar">
      <Usuario {...user}></Usuario>

      <div>
        <ul>
          <li>ssssssssssss</li>
          <li>ss</li>
          <li>ss3</li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

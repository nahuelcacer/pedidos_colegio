import React from "react";
import "./Sidebar.css";
import Usuario from "../user/Usuario";

// 1: su funcion es permitir la navegacion entre las urlsç
// 2: props = urls y usuario
// 3:
const user = {
  username:"Nahuel",
  email:"nahuelcaceres@escribanoschaco.com",
}
const Sidebar = () => {
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

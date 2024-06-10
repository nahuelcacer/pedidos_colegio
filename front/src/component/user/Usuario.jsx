import React from "react";
import "./Usuario.css";
import LogoutButton from "../buttons/logoutButton";

const Usuario = (props) => {
  return (
    <div className="user">
      <div style={{width:'160px'}}>
        <h4>{props.user}</h4>
        <p>{props.email}</p>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>

      <LogoutButton></LogoutButton>
      </div>
    </div>
  );
};

export default Usuario;

import React from "react";
import "./Usuario.css";
import { ReactComponent as MoreIcon } from '../../icons/more.svg';

const Usuario = (props) => {
  return (
    <div className="user">
      <div style={{width:'160px'}}>
        <h4>{props.username}</h4>
        <p>{props.email}</p>
      </div>
      <div>
        <MoreIcon width="22px" height="22px"></MoreIcon>
      </div>
    </div>
  );
};

export default Usuario;
